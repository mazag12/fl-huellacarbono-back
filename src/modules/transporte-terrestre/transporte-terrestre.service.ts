import { Injectable } from '@nestjs/common';
import { TransporteTerrestreIngreso } from './entities/transporte-terrestre-ingreso.entity';
import { Repository } from 'typeorm';
import { TransporteTerrestreTipo } from './entities/transporte-terrestre-tipo.entity';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertTransporteTerrestreTipoDto } from './dto/upsert-transporte-terrestre-tipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpsertTransporteTerrestreIngresoDto } from './dto/upsert-transporte-terrestre-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class TransporteTerrestreService {
  constructor(
    @InjectRepository(TransporteTerrestreIngreso, 'DEV')
    private readonly transporteTerrestreIngresoRepo: Repository<TransporteTerrestreIngreso>,

    @InjectRepository(TransporteTerrestreTipo, 'DEV')
    private readonly transporteTerrestreTipoRepo: Repository<TransporteTerrestreTipo>,
  ) {}

  async getAllTransporteTerrestreIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return this.transporteTerrestreIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
    });
  }

  upsertTransporteTerrestreIngreso = (dt: UpsertTransporteTerrestreIngresoDto, u: AuthUser) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, { ...dt, persona_upsert: u.code }, 'transporteTerrestreIngresoRepo')
      : this.transporteTerrestreIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllTransporteTerrestreTipo = () => this.transporteTerrestreTipoRepo.find();

  upsertTransporteTerrestreTipo = (dt: UpsertTransporteTerrestreTipoDto) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, dt, 'transporteTerrestreTipoRepo')
      : this.transporteTerrestreTipoRepo.save(dt);

  deleteTransporteTerrestreTipo = (id: number) =>
    this.transporteTerrestreTipoRepo.update(id, { flag_activo: false });

  methodDeleteIdFromDtoAndUpdate = (id: number, dto, repository) => {
    delete dto.id;
    return this[repository].update(id, dto);
  }
}
