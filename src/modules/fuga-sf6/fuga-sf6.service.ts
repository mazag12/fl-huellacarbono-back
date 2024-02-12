import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FugaSf6Ingreso } from './entities/fuga-sf6-ingreso.entity';
import { FugaSf6Tipo } from './entities/fuga-sf6-tipo.entity';
import { UpsertFugaSf6TipoDto } from './dto/upsert-fuga-sf6-tipo.dto';
import { Repository } from 'typeorm';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertFugaSf6IngresoDto } from './dto/upsert-fuga-sf6-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class FugaSf6Service {
  constructor(
    @InjectRepository(FugaSf6Ingreso, 'DEV')
    private readonly fugaSf6IngresoRepo: Repository<FugaSf6Ingreso>,

    @InjectRepository(FugaSf6Tipo, 'DEV')
    private readonly fugaSf6TipoRepo: Repository<FugaSf6Tipo>,
  ) {}

  async getAllFugaSf6Ingreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return this.fugaSf6IngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
    });
  }

  upsertFugaSf6Ingreso = (dt: UpsertFugaSf6IngresoDto, u: AuthUser) =>
    dt.id 
      ? this.fugaSf6IngresoRepo.update(dt.id, { ...dt, persona_upsert: u.code }) 
      : this.fugaSf6IngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllFugaSf6Tipo = () => this.fugaSf6TipoRepo.find();

  upsertFugaSf6Tipo = (dt: UpsertFugaSf6TipoDto) =>
    dt.id
      ? this.fugaSf6TipoRepo.update(dt.id, dt)
      : this.fugaSf6TipoRepo.save(dt);

  deleteFugaSf6Tipo = (id: number) =>
    this.fugaSf6TipoRepo.update(id, { flag_activo: false });
}
