import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PapelIngreso } from './entities/papel-ingreso.entity';
import { Repository } from 'typeorm';
import { PapelTipo } from './entities/papel-tipo.entity';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertPapelTipoDto } from './dto/upsert-papel-tipo.dto';
import { UpsertPapelIngresoDto } from './dto/upsert-papel-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class PapelService {
  constructor(
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
      ? this.papelIngresoRepo.update(dt.id, { ...dt, persona_upsert: u.code }) 
      : this.papelIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllPapelTipo = () => this.papelTipoRepo.find();

  upsertPapelTipo = (dt: UpsertPapelTipoDto) =>
    dt.id ? this.papelTipoRepo.update(dt.id, dt) : this.papelTipoRepo.save(dt);

  deletePapelTipo = (id: number) =>
    this.papelTipoRepo.update(id, { flag_activo: false });
}
