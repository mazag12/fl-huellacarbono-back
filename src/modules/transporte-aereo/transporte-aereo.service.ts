import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TransporteAereoIngreso } from './entities/transporte-aereo-ingreso.entity';
import { TransporteAereoTipo } from './entities/transporte-aereo-tipo.entity';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertTransporteAereoTipoDto } from './dto/upsert-transporte-aereo-tipo.dto';
import { UpsertTransporteAereoIngresoDto } from './dto/upsert-transporte-aereo-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { GetReporteByTypeAndDateDto } from 'src/common/dto/get-reporte-by-type-and-date.dto';

@Injectable()
export class TransporteAereoService {
  constructor(
    @InjectDataSource('DEV')
    private readonly DEV: DataSource,

    @InjectRepository(TransporteAereoIngreso, 'DEV')
    private readonly transporteAereoIngresoRepo: Repository<TransporteAereoIngreso>,

    @InjectRepository(TransporteAereoTipo, 'DEV')
    private readonly transporteAereoTipoRepo: Repository<TransporteAereoTipo>,
  ) {}

  async getAllTransporteAereoIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return this.transporteAereoIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
    });
  }

  upsertTransporteAereoIngreso = (dt: UpsertTransporteAereoIngresoDto, u: AuthUser) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, { ...dt, persona_upsert: u.code }, 'transporteAereoIngresoRepo')
      : this.transporteAereoIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllTransporteAereoTipo = () => this.transporteAereoTipoRepo.find();

  upsertTransporteAereoTipo = (dt: UpsertTransporteAereoTipoDto) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, dt, 'transporteAereoTipoRepo')
      : this.transporteAereoTipoRepo.save(dt);

  deleteTransporteAereoTipo = (id: number) =>
    this.transporteAereoTipoRepo.update(id, { flag_activo: false });

  methodDeleteIdFromDtoAndUpdate = (id: number, dto, repository) => {
    delete dto.id;
    return this[repository].update(id, dto);
  }

  getReporteTransporteAereoByDate = async ({ tipoDate, valueDate }: GetReporteByTypeAndDateDto) =>
    this.DEV.query(`SELECT ing.area, ing.fecha_ingreso, SUM(ing.cantidad) as cantidad, ing.factura, SUM(ing.tramo) as tramo,
          , SUM(ing.distancia) as distancia, SUM(ing.numero_persona) as numero_persona
          , SUM(ing.numero_recorridos) as numero_recorridos, ing.evidencia_url
          , tip.nombre as transporte_aereo_tipo, tip.nombre, tip.co2
        FROM tb_huellacarbono_transporte_aereo_ingreso ing
        INNER JOIN tb_huellacarbono_transporte_aereo_tipo tip ON ing.tipo_transporte_aereo_id = tip.id
        WHERE ${tipoDate}(ing.fecha_ingreso) = '${valueDate}'
        GROUP BY ing.area, ing.fecha_ingreso, ing.factura, ing.evidencia_url, tip.nombre, tip.nombre, tip.co2`)

}
