import { Injectable } from '@nestjs/common';
import { ElectricidadTipo } from './entities/electricidad-tipo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpsertElectricidadTipoDto } from './dto/upsert-electricidad-tipo.dto';
import { ElectricidadIngreso } from './entities/electricidad-ingreso.entity';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertElectricidadIngresoDto } from './dto/upsert-electricidad-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { GetReporteByTypeAndDateDto } from '../../common/dto/get-reporte-by-type-and-date.dto';
import { GetIdByTypeFacturaTipo } from 'src/common/dto/get-id-by-factura-and-tipo.dto';

@Injectable()
export class ElectricidadService {
  constructor(
    @InjectRepository(ElectricidadTipo, 'DEV')
    private readonly electricidadTipoRepo: Repository<ElectricidadTipo>,

    @InjectRepository(ElectricidadIngreso, 'DEV')
    private readonly electricidadIngresoRepo: Repository<ElectricidadIngreso>,
  ) {}

  async getAllElectricidadIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return this.electricidadIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
      order: {
        id: 'DESC',
      },
    });
  }

  getElectricidadIngreso = (id : number) => this.electricidadIngresoRepo.findOneBy({id});

  getElectricidadByFactura = ({ factura, tipo_electricidad_id }: GetIdByTypeFacturaTipo) => 
  this.electricidadIngresoRepo.query(`SELECT count(id) FROM tb_huellacarbono_electricidad_ingreso
    WHERE factura = '${factura}' AND tipo_electricidad_id = ${tipo_electricidad_id}`);

  upsertElectricidadIngreso = (dt: UpsertElectricidadIngresoDto, u: AuthUser) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, { ...dt, persona_upsert: u.code }, 'electricidadIngresoRepo')
      : this.electricidadIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllElectricidadTipo = () => this.electricidadTipoRepo.find();

  upsertElectricidadTipo = (dt: UpsertElectricidadTipoDto) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, dt, 'electricidadTipoRepo')
      : this.electricidadTipoRepo.save(dt);

  deleteElectricidadTipo = (id: number) =>
    this.electricidadTipoRepo.update(id, { flag_activo: false });

  methodDeleteIdFromDtoAndUpdate = (id: number, dto, repository) => {
    delete dto.id;
    return this[repository].update(id, dto);
  }

  getReporteElectricidadByDate = ({ tipoDate, valueDate }: GetReporteByTypeAndDateDto) => 
    this.electricidadIngresoRepo.query(`SELECT tip.id, tip.nombre, tip.unidad, tip.ch4, tip.factor, tip.valor_neto, tip.co2, tip.n2o, SUM(ing.cantidad) as  cantidad
          FROM tb_huellacarbono_electricidad_ingreso ing
          INNER JOIN tb_huellacarbono_electricidad_tipo tip ON ing.tipo_electricidad_id = tip.id
          WHERE ${tipoDate}(ing.fecha_ingreso) = '${valueDate}' AND tip.flag_activo = 'true'
          GROUP BY tip.nombre, tip.unidad, tip.ch4, tip.factor, tip.valor_neto, tip.co2, tip.n2o, tip.id`);
}
