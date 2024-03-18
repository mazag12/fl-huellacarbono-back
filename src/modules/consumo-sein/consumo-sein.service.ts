import { Injectable } from '@nestjs/common';
import { UpsertConsumoSeinTipoDto } from './dto/upsert-consumo-sein-tipo.dto';
import { ConsumoSeinTipo } from './entities/consumo-sein-tipo.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { createFilter } from 'src/common/utils/filter';
import PaginationDto from 'src/common/dto/pagination.dto';
import { ConsumoSeinIngreso } from './entities/consumo-sein-ingreso.entity';
import { UpsertConsumoSeinIngresoDto } from './dto/upsert-consumo-sein-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { GetReporteByTypeAndDateDto } from 'src/common/dto/get-reporte-by-type-and-date.dto';

@Injectable()
export class ConsumoSeinService {
  constructor(

    @InjectDataSource('DEV')
    private readonly DEV: DataSource,

    @InjectRepository(ConsumoSeinTipo, 'DEV')
    private readonly consumoSeinTipoRepo: Repository<ConsumoSeinTipo>,

    @InjectRepository(ConsumoSeinIngreso, 'DEV')
    private readonly consumoSeinIngresoRepo: Repository<ConsumoSeinIngreso>,
  ) {}

  async getAllConsumoSeinIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    const count = await this.consumoSeinIngresoRepo.count({ where });
    const rows = await this.consumoSeinIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
      order: { id: 'DESC' },
    });
    return { count, rows };
  }

  upsertConsumoSeinIngreso = (dt: UpsertConsumoSeinIngresoDto, u: AuthUser) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, { ...dt, persona_upsert: u.code }, 'consumoSeinIngresoRepo')
      : this.consumoSeinIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllConsumoSeinTipo = () => this.consumoSeinTipoRepo.find();

  upsertConsumoSeinTipo = (dt: UpsertConsumoSeinTipoDto) =>
    dt.id
      ? this.consumoSeinTipoRepo.update(dt.id, dt)
      : this.consumoSeinTipoRepo.save(dt);

  deleteConsumoSeinTipo = (id: number) =>
    this.consumoSeinTipoRepo.update(id, { flag_activo: false });

  methodDeleteIdFromDtoAndUpdate = (id: number, dto, repository) => {
    delete dto.id;
    return this[repository].update(id, dto);
  }

  getReporteConsumoSeinByDate = async ({ tipoDate, valueDate }: GetReporteByTypeAndDateDto) => 
    this.DEV.query(`SELECT ing.area, ing.fecha_ingreso, ing.suministro, SUM(ing.cantidad) as cantidad, ing.evidencia_url
            , tip.unidad, tip.factor, tip.co2, tip.ch4, tip.n2o
          FROM tb_huellacarbono_consumo_sein_ingreso ing
          INNER JOIN tb_huellacarbono_consumo_sein_tipo tip ON ing.tipo_consumo_sein_id = tip.id
          WHERE ${tipoDate}(ing.fecha_ingreso) = '${valueDate}'
          GROUP BY ing.area, ing.fecha_ingreso, ing.suministro, ing.evidencia_url, tip.unidad, tip.factor, tip.co2, tip.ch4, tip.n2o`)
}
