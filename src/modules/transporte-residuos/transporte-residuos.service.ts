import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransporteResiduosIngreso } from './entities/transporte-residuos-ingreso.entity';
import { TransporteResiduosTipo } from './entities/transporte-residuos-tipo.entity';
import { UpsertTransporteResiduosTipoDto } from './dto/upsert-transporte-residuos-tipo.dto';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { TransporteResiduosSed } from './entities/transporte-residuos-sed.entity';
import { UpsertTransporteResiduosIngresoDto } from './dto/upsert-transporte-residuos-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class TransporteResiduosService {
  constructor(
    @InjectRepository(TransporteResiduosIngreso, 'DEV')
    private readonly transporteResiduosIngresoRepo: Repository<TransporteResiduosIngreso>,

    @InjectRepository(TransporteResiduosTipo, 'DEV')
    private readonly transporteResiduosTipoRepo: Repository<TransporteResiduosTipo>,

    @InjectRepository(TransporteResiduosSed, 'DEV')
    private readonly transporteResiduosSedRepo: Repository<TransporteResiduosSed>,
  ) {}

  async getAllTransporteResiduosIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return this.transporteResiduosIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
    });
  }

  upsertTransporteResiduosIngreso = (dt: UpsertTransporteResiduosIngresoDto, u: AuthUser) =>
    dt.id
      ? this.transporteResiduosIngresoRepo.update(dt.id, { ...dt, persona_upsert: u.code })
      : this.transporteResiduosIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllTransporteResiduosTipo = () => this.transporteResiduosTipoRepo.find();

  upsertTransporteResiduosTipo = (dt: UpsertTransporteResiduosTipoDto) =>
    dt.id
      ? this.transporteResiduosTipoRepo.update(dt.id, dt)
      : this.transporteResiduosTipoRepo.save(dt);

  deleteTransporteResiduosTipo = (id: number) =>
    this.transporteResiduosTipoRepo.update(id, { flag_activo: false });

  getAllTransporteResiduosSed = () => this.transporteResiduosSedRepo.find();

  upsertTransporteResiduosSed = (dt: UpsertTransporteResiduosTipoDto) =>
    dt.id
      ? this.transporteResiduosSedRepo.save(dt)
      : this.transporteResiduosSedRepo.save(dt);

  deleteTransporteResiduosSed = (id: number) =>
    this.transporteResiduosSedRepo.update(id, { flag_activo: false });
}
