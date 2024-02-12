import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { Repository } from 'typeorm';
import { TransporteCasaTrabajoIngreso } from './entities/transporte-casa-trabajo-ingreso';
import { TransporteCasaTrabajoTipo } from './entities/transporte-casa-trabajo-tipo.entity';
import { UpsertTransporteCasaTrabajoTipoDto } from './dto/upsert-transporte-casa-trabajo-tipo.dto';
import { UpsertTransporteCasaTrabajoIngresoDto } from './dto/upsert-transporte-casa-trabajo-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class TransporteCasaTrabajoService {
  constructor(
    @InjectRepository(TransporteCasaTrabajoIngreso, 'DEV')
    private readonly transporteCasaTrabajoIngresoRepo: Repository<TransporteCasaTrabajoIngreso>,

    @InjectRepository(TransporteCasaTrabajoTipo, 'DEV')
    private readonly transporteCasaTrabajoTipoRepo: Repository<TransporteCasaTrabajoTipo>,
  ) {}

  async getAllTransporteCasaTrabajoIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return this.transporteCasaTrabajoIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
    });
  }

  upsertTransporteCasaTrabajoIngreso = (
    dt: UpsertTransporteCasaTrabajoIngresoDto,
    u: AuthUser
  ) =>
    dt.id
      ? this.transporteCasaTrabajoIngresoRepo.update(dt.id, { ...dt, persona_upsert: u.code })
      : this.transporteCasaTrabajoIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllTransporteCasaTrabajoTipo = () =>
    this.transporteCasaTrabajoTipoRepo.find();

  upsertTransporteCasaTrabajoTipo = (dt: UpsertTransporteCasaTrabajoTipoDto) =>
    dt.id
      ? this.transporteCasaTrabajoTipoRepo.update(dt.id, dt)
      : this.transporteCasaTrabajoTipoRepo.save(dt);

  deleteTransporteCasaTrabajoTipo = (id: number) =>
    this.transporteCasaTrabajoTipoRepo.update(id, { flag_activo: false });
}
