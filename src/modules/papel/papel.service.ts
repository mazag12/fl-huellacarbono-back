import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { PapelIngreso } from './entities/papel-ingreso.entity';
import { DataSource, Repository } from 'typeorm';
import { PapelTipo } from './entities/papel-tipo.entity';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertPapelTipoDto } from './dto/upsert-papel-tipo.dto';
import { UpsertPapelIngresoDto } from './dto/upsert-papel-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { GetReporteByTypeAndDateDto } from 'src/common/dto/get-reporte-by-type-and-date.dto';

@Injectable()
export class PapelService {
  constructor(
    @InjectDataSource('DEV')
    private readonly DEV: DataSource,

    @InjectRepository(PapelIngreso, 'DEV')
    private readonly papelIngresoRepo: Repository<PapelIngreso>,

    @InjectRepository(PapelTipo, 'DEV')
    private readonly papelTipoRepo: Repository<PapelTipo>,
  ) {}

  async getAllPapelIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return this.papelIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
    });
  }

  upsertPapelIngreso = (dt: UpsertPapelIngresoDto, u: AuthUser) =>
    dt.id 
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, { ...dt, persona_upsert: u.code }, 'papelIngresoRepo') 
      : this.papelIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllPapelTipo = () => this.papelTipoRepo.find();

  upsertPapelTipo = (dt: UpsertPapelTipoDto) =>
    dt.id ? this.methodDeleteIdFromDtoAndUpdate(dt.id, dt, 'papelTipoRepo') : this.papelTipoRepo.save(dt);

  deletePapelTipo = (id: number) =>
    this.papelTipoRepo.update(id, { flag_activo: false });

  methodDeleteIdFromDtoAndUpdate = (id: number, dto, repository) => {
    delete dto.id;
    return this[repository].update(id, dto);
  }

  getReportePapelByDate = async ({ tipoDate, valueDate }: GetReporteByTypeAndDateDto) =>
    this.DEV.query(`SELECT ing.area, ing.fecha_ingreso, SUM(ing.cantidad) as cantidad, SUM(ing.reciclado) as reciclado
          , ing.nombre_certificado, ing.densidad, ing.evidencia_url
          , tip.nombre as papel_tipo, tip.unidad, tip.co2
        FROM tb_huellacarbono_papel_ingreso ing
        INNER JOIN tb_huellacarbono_papel_tipo tip ON ing.tipo_papel_id = tip.id
        WHERE ${tipoDate}(ing.fecha_ingreso) = '${valueDate}'
        GROUP BY ing.area, ing.fecha_ingreso, ing.nombre_certificado, ing.densidad, ing.evidencia_url, tip.nombre, tip.co2, tip.unidad`)
}
