import { Injectable } from '@nestjs/common';
import { UpsertConsumoSeinTipoDto } from './dto/upsert-consumo-sein-tipo.dto';
import { ConsumoSeinTipo } from './entities/consumo-sein-tipo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createFilter } from 'src/common/utils/filter';
import PaginationDto from 'src/common/dto/pagination.dto';
import { ConsumoSeinIngreso } from './entities/consumo-sein-ingreso.entity';
import { UpsertConsumoSeinIngresoDto } from './dto/upsert-consumo-sein-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class ConsumoSeinService {
  constructor(
    @InjectRepository(ConsumoSeinTipo, 'DEV')
    private readonly consumoSeinTipoRepo: Repository<ConsumoSeinTipo>,

    @InjectRepository(ConsumoSeinIngreso, 'DEV')
    private readonly consumoSeinIngresoRepo: Repository<ConsumoSeinIngreso>,
  ) {}

  async getAllConsumoSeinIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return this.consumoSeinIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
    });
  }

  upsertConsumoSeinIngreso = (dt: UpsertConsumoSeinIngresoDto, u: AuthUser) =>
    dt.id
      ? this.consumoSeinIngresoRepo.update(dt.id, { ...dt, persona_upsert: u.code })
      : this.consumoSeinIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllConsumoSeinTipo = () => this.consumoSeinTipoRepo.find();

  upsertConsumoSeinTipo = (dt: UpsertConsumoSeinTipoDto) =>
    dt.id
      ? this.consumoSeinTipoRepo.update(dt.id, dt)
      : this.consumoSeinTipoRepo.save(dt);

  deleteConsumoSeinTipo = (id: number) =>
    this.consumoSeinTipoRepo.update(id, { flag_activo: false });
}
