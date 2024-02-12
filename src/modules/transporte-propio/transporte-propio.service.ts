import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransportePropioIngreso } from './entities/transporte-propio-ingreso.entity';
import { TransportePropioTipo } from './entities/transporte-propio-tipo.entity';
import { UpsertTransportePropioTipoDto } from './dto/upsert-transporte-propio-tipo.dto';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertTransportePropioIngresoDto } from './dto/upsert-transporte-propio-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class TransportePropioService {
  constructor(
    @InjectRepository(TransportePropioIngreso, 'DEV')
    private readonly transportePropioIngresoRepo: Repository<TransportePropioIngreso>,

    @InjectRepository(TransportePropioTipo, 'DEV')
    private readonly transportePropioTipoRepo: Repository<TransportePropioTipo>,
  ) {}

  async getAllTransportePropioIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return this.transportePropioIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
    });
  }

  upsertTransportePropioIngreso = (dt: UpsertTransportePropioIngresoDto, u: AuthUser) =>
    dt.id
      ? this.transportePropioIngresoRepo.update(dt.id, { ...dt, persona_upsert: u.code })
      : this.transportePropioIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllTransportePropioTipo = () => this.transportePropioTipoRepo.find();

  upsertTransportePropioTipo = (dt: UpsertTransportePropioTipoDto) =>
    dt.id
      ? this.transportePropioTipoRepo.update(dt.id, dt)
      : this.transportePropioTipoRepo.save(dt);

  deleteTransportePropioTipo = (id: number) =>
    this.transportePropioTipoRepo.update(id, { flag_activo: false });
}
