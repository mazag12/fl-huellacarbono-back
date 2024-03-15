import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { RefrigeranteIngreso } from './entities/refrigerante-ingreso.entity';
import { RefrigeranteTipo } from './entities/refrigerante-tipo.entity';
import { RefrigeranteEquipo } from './entities/refrigerante-equipo.entity';
import { DataSource, Repository } from 'typeorm';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertRefrigeranteTipoDto } from './dto/upsert-refrigerante-tipo.dto';
import { UpsertRefrigeranteEquipoDto } from './dto/upsert-refrigerante-equipo.dto';
import { UpsertRefrigeranteIngresoDto } from './dto/upsert-refrigerante-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { GetReporteByTypeAndDateDto } from 'src/common/dto/get-reporte-by-type-and-date.dto';

@Injectable()
export class RefrigeranteService {
  constructor(
    @InjectDataSource('DEV')
    private readonly DEV: DataSource,

    @InjectRepository(RefrigeranteIngreso, 'DEV')
    private readonly refrigeranteIngresoRepo: Repository<RefrigeranteIngreso>,

    @InjectRepository(RefrigeranteTipo, 'DEV')
    private readonly refrigeranteTipoRepo: Repository<RefrigeranteTipo>,

    @InjectRepository(RefrigeranteEquipo, 'DEV')
    private readonly refrigeranteEquipoRepo: Repository<RefrigeranteEquipo>,
  ) {}

  async getAllRefrigeranteIngreso(pg: PaginationDto) {
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
    const count = await this.refrigeranteIngresoRepo.count({ where });
    const rows = await this.refrigeranteIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
      order: { id: 'DESC' },
    });
    return { count, rows };
  }

  upsertRefrigeranteIngreso = (dt: UpsertRefrigeranteIngresoDto, u: AuthUser) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, { ...dt, persona_upsert: u.code }, 'refrigeranteIngresoRepo')
      : this.refrigeranteIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllRefrigeranteTipo = () => this.refrigeranteTipoRepo.find();

  upsertRefrigeranteTipo = (dt: UpsertRefrigeranteTipoDto) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, dt, 'refrigeranteTipoRepo')
      : this.refrigeranteTipoRepo.save(dt);

  deleteRefrigeranteTipo = (id: number) =>
    this.refrigeranteTipoRepo.update(id, { flag_activo: false });

  getAllRefrigeranteEquipo = () => this.refrigeranteEquipoRepo.find();

  upsertRefrigeranteEquipo = (dt: UpsertRefrigeranteEquipoDto) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, dt, 'refrigeranteEquipoRepo')
      : this.refrigeranteEquipoRepo.save(dt);

  deleteRefrigeranteEquipo = (id: number) =>
    this.refrigeranteEquipoRepo.update(id, { flag_activo: false });

  methodDeleteIdFromDtoAndUpdate = (id: number, dto, repository) => {
    delete dto.id;
    return this[repository].update(id, dto);
  }

  getReporteRefrigeranteByDate = async ({ tipoDate, valueDate }: GetReporteByTypeAndDateDto) =>
    this.DEV.query(`SELECT ing.area, ing.fecha_ingreso, SUM(ing.cantidad) as cantidad, ing.capacidad_carga
          , ing.porcentaje_fuga, ing.tipo_operacion, ing.fraccion_disposicion, ing.fraccion_recuperacion
          , SUM(ing.fuga_instalacion) as fuga_instalacion, SUM(ing.tiempo_uso) as tiempo_uso, ing.evidencia_url
          , tip.nombre as papel_tipo, equ.nombre as papel_equipo
        FROM tb_huellacarbono_refrigerante_ingreso ing
        INNER JOIN tb_huellacarbono_refrigerante_tipo tip ON ing.tipo_refrigerante_id = tip.id
        INNER JOIN tb_huellacarbono_refrigerante_equipo equ ON ing.equipo_refrigerante_id = equ.id
        WHERE ${tipoDate}(ing.fecha_ingreso) = '${valueDate}'
        GROUP BY ing.area, ing.fecha_ingreso, ing.capacidad_carga,ing.porcentaje_fuga, ing.tipo_operacion, 
        ing.fraccion_disposicion, ing.fraccion_recuperacion, ing.evidencia_url, tip.nombre, equ.nombre`)
}
