import { Injectable } from '@nestjs/common';
import { ElectricidadTipo } from './entities/electricidad-tipo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpsertElectricidadTipoDto } from './dto/upsert-electricidad-tipo.dto';
import { ElectricidadIngreso } from './entities/electricidad-ingreso.entity';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertElectricidadIngresoDto } from './dto/upsert-electricidad-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class ElectricidadService {
  constructor(
    @InjectRepository(ElectricidadTipo, 'DEV')
    private readonly electricidadTipoRepo: Repository<ElectricidadTipo>,

    @InjectRepository(ElectricidadIngreso, 'DEV')
    private readonly electricidadIngresoRepo: Repository<ElectricidadIngreso>,
  ) {}

  async getAllElectricidadIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return this.electricidadIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
    });
  }

  upsertElectricidadIngreso = (dt: UpsertElectricidadIngresoDto, u: AuthUser) =>
    dt.id
      ? this.electricidadIngresoRepo.update(dt.id, { ...dt, persona_upsert: u.code })
      : this.electricidadIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllElectricidadTipo = () => this.electricidadTipoRepo.find();

  upsertElectricidadTipo = (dt: UpsertElectricidadTipoDto) =>
    dt.id
      ? this.electricidadTipoRepo.update(dt.id, dt)
      : this.electricidadTipoRepo.save(dt);

  deleteElectricidadTipo = (id: number) =>
    this.electricidadTipoRepo.update(id, { flag_activo: false });
}
