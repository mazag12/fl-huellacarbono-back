import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransporteAereoIngreso } from './entities/transporte-aereo-ingreso.entity';
import { TransporteAereoTipo } from './entities/transporte-aereo-tipo.entity';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertTransporteAereoTipoDto } from './dto/upsert-transporte-aereo-tipo.dto';
import { UpsertTransporteAereoIngresoDto } from './dto/upsert-transporte-aereo-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class TransporteAereoService {
  constructor(
    @InjectRepository(TransporteAereoIngreso, 'DEV')
    private readonly transporteAereoIngresoRepo: Repository<TransporteAereoIngreso>,

    @InjectRepository(TransporteAereoTipo, 'DEV')
    private readonly transporteAereoTipoRepo: Repository<TransporteAereoTipo>,
  ) {}

  async getAllTransporteAereoIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return this.transporteAereoIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
    });
  }

  upsertTransporteAereoIngreso = (dt: UpsertTransporteAereoIngresoDto, u: AuthUser) =>
    dt.id
      ? this.transporteAereoIngresoRepo.update(dt.id, { ...dt, persona_upsert: u.code })
      : this.transporteAereoIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllTransporteAereoTipo = () => this.transporteAereoTipoRepo.find();

  upsertTransporteAereoTipo = (dt: UpsertTransporteAereoTipoDto) =>
    dt.id
      ? this.transporteAereoTipoRepo.update(dt.id, dt)
      : this.transporteAereoTipoRepo.save(dt);

  deleteTransporteAereoTipo = (id: number) =>
    this.transporteAereoTipoRepo.update(id, { flag_activo: false });
}
