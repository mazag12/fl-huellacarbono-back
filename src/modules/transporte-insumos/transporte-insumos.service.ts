import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TransporteInsumosIngreso } from './entities/transporte-insumos-ingreso.entity';
import { TransporteInsumosTipo } from './entities/transporte-insumos-tipo.entity';
import PaginationDto from 'src/common/dto/pagination.dto';
import { UpsertTransporteInsumosTipoDto } from './dto/upsert-transporte-insumos-tipo.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertTransporteInsumosIngresoDto } from './dto/upsert-transporte-insumos-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { GetReporteByTypeAndDateDto } from 'src/common/dto/get-reporte-by-type-and-date.dto';

@Injectable()
export class TransporteInsumosService {
  constructor(

    @InjectDataSource('DEV')
    private readonly DEV: DataSource,

    @InjectRepository(TransporteInsumosIngreso, 'DEV')
    private readonly transporteInsumosIngresoRepo: Repository<TransporteInsumosIngreso>,

    @InjectRepository(TransporteInsumosTipo, 'DEV')
    private readonly transporteInsumosTipoRepo: Repository<TransporteInsumosTipo>,
  ) {}

  async getAllTransporteInsumosIngreso(pg: PaginationDto) {
    const where = {};
    if (pg.factura){
      where['factura'] = pg.factura;
    }
    if (pg.tipo){
      where['tipo_electricidad_id'] = pg.tipo;
    }
    if (pg.fecha){
      where['fecha_ingreso'] = pg.fecha;
    }
    const count = await this.transporteInsumosIngresoRepo.count({ where });
    const rows = await this.transporteInsumosIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
      order: { id: 'DESC' },
    });
    return { count, rows };
  }

  upsertTransporteInsumosIngreso = (dt: UpsertTransporteInsumosIngresoDto, u: AuthUser) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, { ...dt, persona_upsert: u.code }, 'transporteInsumosIngresoRepo')
      : this.transporteInsumosIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllTransporteInsumosTipo = () => this.transporteInsumosTipoRepo.find();

  upsertTransporteInsumosTipo = (dt: UpsertTransporteInsumosTipoDto) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, dt, 'transporteInsumosTipoRepo')
      : this.transporteInsumosTipoRepo.save(dt);

  deleteTransporteInsumosTipo = (id: number) =>
    this.transporteInsumosTipoRepo.update(id, { flag_activo: false });

  methodDeleteIdFromDtoAndUpdate = (id: number, dto, repository) => {
    delete dto.id;
    return this[repository].update(id, dto);
  }

  getReporteTransporteInsumosByDate = async ({ tipoDate, valueDate }: GetReporteByTypeAndDateDto) =>
    this.DEV.query(`SELECT ing.area, ing.fecha_ingreso, ing.descripcion_carga
          , SUM(ing.cantidad) as cantidad, SUM(ing.viajes_totales) as viajes_totales
          , SUM(ing.tramo_viaje) as tramo_viaje, SUM(ing.peso) as peso
          , SUM(ing.distancia) as distancia, ing.evidencia_url
          , tip.nombre as transporte_insumos_tipo, tip.co2
        FROM tb_huellacarbono_transporte_insumos_ingreso ing
        INNER JOIN tb_huellacarbono_transporte_insumos_tipo tip ON ing.tipo_transporte_insumos_id = tip.id
        WHERE ${tipoDate}(ing.fecha_ingreso) = '${valueDate}'
        GROUP BY ing.area, ing.fecha_ingreso, ing.descripcion_carga, ing.evidencia_url, tip.nombre, tip.nombre, tip.co2`)
}
