import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { FugaSf6Ingreso } from './entities/fuga-sf6-ingreso.entity';
import { FugaSf6Tipo } from './entities/fuga-sf6-tipo.entity';
import { UpsertFugaSf6TipoDto } from './dto/upsert-fuga-sf6-tipo.dto';
import { DataSource, Repository } from 'typeorm';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertFugaSf6IngresoDto } from './dto/upsert-fuga-sf6-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { GetReporteByTypeAndDateDto } from 'src/common/dto/get-reporte-by-type-and-date.dto';

@Injectable()
export class FugaSf6Service {
  constructor(
    @InjectDataSource('DEV')
    private readonly DEV: DataSource,
    
    @InjectRepository(FugaSf6Ingreso, 'DEV')
    private readonly fugaSf6IngresoRepo: Repository<FugaSf6Ingreso>,

    @InjectRepository(FugaSf6Tipo, 'DEV')
    private readonly fugaSf6TipoRepo: Repository<FugaSf6Tipo>,
  ) {}

  async getAllFugaSf6Ingreso(pg: PaginationDto) {
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
    const count = await this.fugaSf6IngresoRepo.count({ where });
    const rows = await this.fugaSf6IngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
      order: { id: 'DESC' },
    });
    return { count, rows };
  }

  upsertFugaSf6Ingreso = (dt: UpsertFugaSf6IngresoDto, u: AuthUser) =>
    dt.id 
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, { ...dt, persona_upsert: u.code }, 'fugaSf6IngresoRepo') 
      : this.fugaSf6IngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllFugaSf6Tipo = () => this.fugaSf6TipoRepo.find();

  upsertFugaSf6Tipo = (dt: UpsertFugaSf6TipoDto) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, dt, 'fuagSf6TipoRepo')
      : this.fugaSf6TipoRepo.save(dt);

  deleteFugaSf6Tipo = (id: number) =>
    this.fugaSf6TipoRepo.update(id, { flag_activo: false });

  methodDeleteIdFromDtoAndUpdate = (id: number, dto, repository) => {
    delete dto.id;
    return this[repository].update(id, dto);
  }

  getReporteFugaSf6ByDate = async ({ tipoDate, valueDate }: GetReporteByTypeAndDateDto) => 
    this.DEV.query(`SELECT ing.area, ing.fecha_ingreso, SUM(ing.cantidad) as cantidad, SUM(ing.capacidad_carga) as capacidad_carga
        , SUM(ing.fuga_instalacion) as fuga_instalacion, SUM(ing.tiempo_uso) as tiempo_uso
        , SUM(ing.fuga_uso) as fuga_uso, SUM(ing.fraccion_disposicion) as fraccion_disposicion
        , SUM(ing.fraccion_recuperado) as fraccion_recuperado, ing.evidencia_url
        , tip.nombre as fuga_sf6_tipo, tip.co2
      FROM tb_huellacarbono_fuga_sf6_ingreso ing
      INNER JOIN tb_huellacarbono_fuga_sf6_tipo tip ON ing.tipo_fuga_sf6_id = tip.id
      WHERE ${tipoDate}(ing.fecha_ingreso) = '${valueDate}'
      GROUP BY ing.area, ing.fecha_ingreso, ing.evidencia_url, tip.nombre, tip.co2`)
}
