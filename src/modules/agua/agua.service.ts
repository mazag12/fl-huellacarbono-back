import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AguaIngreso } from './entities/agua-ingreso.entity';
import { DataSource, Repository } from 'typeorm';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertAguaIngresoDto } from './dto/upsert-agua-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class AguaService {
  constructor(
    @InjectRepository(AguaIngreso, 'DEV')
    private readonly aguaIngresoRepo: Repository<AguaIngreso>,

    @InjectDataSource('DEV')
    private readonly DEV: DataSource,
  ) {}

  async getAllAguaIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return await this.aguaIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
    });
  }

  upsertAguaIngreso = (dt: UpsertAguaIngresoDto, u: AuthUser) =>
    dt.id
      ? this.aguaIngresoRepo.update(dt.id, { ...dt, persona_upsert: u.code })
      : this.aguaIngresoRepo.save({ ...dt, persona_upsert: u.code });
}
