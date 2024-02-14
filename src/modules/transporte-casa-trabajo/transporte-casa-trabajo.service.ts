import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { DataSource, Repository } from 'typeorm';
import { TransporteCasaTrabajoIngreso } from './entities/transporte-casa-trabajo-ingreso';
import { TransporteCasaTrabajoTipo } from './entities/transporte-casa-trabajo-tipo.entity';
import { UpsertTransporteCasaTrabajoTipoDto } from './dto/upsert-transporte-casa-trabajo-tipo.dto';
import { UpsertTransporteCasaTrabajoIngresoDto } from './dto/upsert-transporte-casa-trabajo-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { GetReporteByTypeAndDateDto } from 'src/common/dto/get-reporte-by-type-and-date.dto';

@Injectable()
export class TransporteCasaTrabajoService {
  constructor(
    @InjectDataSource('DEV')
    private readonly DEV: DataSource,

    @InjectRepository(TransporteCasaTrabajoIngreso, 'DEV')
    private readonly transporteCasaTrabajoIngresoRepo: Repository<TransporteCasaTrabajoIngreso>,

    @InjectRepository(TransporteCasaTrabajoTipo, 'DEV')
    private readonly transporteCasaTrabajoTipoRepo: Repository<TransporteCasaTrabajoTipo>,
  ) {}

  async getAllTransporteCasaTrabajoIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return this.transporteCasaTrabajoIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
    });
  }

  upsertTransporteCasaTrabajoIngreso = (
    dt: UpsertTransporteCasaTrabajoIngresoDto,
    u: AuthUser
  ) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, { ...dt, persona_upsert: u.code }, 'transporteCasaTrabajoIngresoRepo')
      : this.transporteCasaTrabajoIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllTransporteCasaTrabajoTipo = () =>
    this.transporteCasaTrabajoTipoRepo.find();

  upsertTransporteCasaTrabajoTipo = (dt: UpsertTransporteCasaTrabajoTipoDto) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, dt, 'transporteCasaTrabajoTipoRepo')
      : this.transporteCasaTrabajoTipoRepo.save(dt);

  deleteTransporteCasaTrabajoTipo = (id: number) =>
    this.transporteCasaTrabajoTipoRepo.update(id, { flag_activo: false });

  methodDeleteIdFromDtoAndUpdate = (id: number, dto, repository) => {
    delete dto.id;
    return this[repository].update(id, dto);
  }

  getReporteTransporteCasaTrabajoByDate = ({ valueDate, tipoDate }: GetReporteByTypeAndDateDto) =>
    this.DEV.query(`SELECT ing.area, ing.fecha_ingreso, ing.descripcion_personal
          , SUM(ing.numero_trabajadores) as numero_trabajadores, SUM(ing.viajes_por_semana_promedio) as viajes_por_semana_promedio
          , SUM(ing.dias_laborales) as dias_laborales, SUM(ing.distancia_promedio) as distancia_promedio
          , ing.evidencia_url
          , tip.nombre as transporte_casa_trabajo_tipo, tip.co2, tip.ch4, tip.n2o
        FROM tb_huellacarbono_transporte_casa_trabajo_ingreso ing
        INNER JOIN tb_huellacarbono_transporte_casa_trabajo_tipo tip ON ing.tipo_transporte_casa_trabajo_id = tip.id
        WHERE ${tipoDate}(ing.fecha_ingreso) = '${valueDate}'
        GROUP BY ing.area, ing.fecha_ingreso, ing.descripcion_personal, ing.evidencia_url, tip.nombre, tip.nombre, tip.co2, tip.ch4, tip.n2o`)
}
