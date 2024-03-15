import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AguaIngreso } from './entities/agua-ingreso.entity';
import { DataSource, Repository } from 'typeorm';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertAguaIngresoDto } from './dto/upsert-agua-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { GetReporteByTypeAndDateDto } from 'src/common/dto/get-reporte-by-type-and-date.dto';

@Injectable()
export class AguaService {
  constructor(
    @InjectRepository(AguaIngreso, 'DEV')
    private readonly aguaIngresoRepo: Repository<AguaIngreso>,

    @InjectDataSource('DEV')
    private readonly DEV: DataSource,
  ) {}

  async getAllAguaIngreso(pg: PaginationDto) {
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
    const count = await this.aguaIngresoRepo.count({ where });
    const rows = await this.aguaIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
      order: { id: 'DESC' },
    });
    return { count, rows };
  }

  upsertAguaIngreso = (dt: UpsertAguaIngresoDto, u: AuthUser) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, { ...dt, persona_upsert: u.code }, 'aguaIngresoRepo')
      : this.aguaIngresoRepo.save({ ...dt, persona_upsert: u.code });

  methodDeleteIdFromDtoAndUpdate = (id: number, dto, repository) => {
    delete dto.id;
    return this[repository].update(id, dto);
  };

  getReporteAguaByDate = async ({ tipoDate, valueDate }: GetReporteByTypeAndDateDto) => 
    this.DEV.query(`SELECT medidor, SUM(cantidad) as  cantidad
        FROM tb_huellacarbono_agua_ingreso ing
        WHERE ${tipoDate}(ing.fecha_ingreso) = '${valueDate}'
        GROUP BY ing.medidor`)
}
