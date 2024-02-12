import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefrigeranteIngreso } from './entities/refrigerante-ingreso.entity';
import { RefrigeranteTipo } from './entities/refrigerante-tipo.entity';
import { RefrigeranteEquipo } from './entities/refrigerante-equipo.entity';
import { Repository } from 'typeorm';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertRefrigeranteTipoDto } from './dto/upsert-refrigerante-tipo.dto';
import { UpsertRefrigeranteEquipoDto } from './dto/upsert-refrigerante-equipo.dto';
import { UpsertRefrigeranteIngresoDto } from './dto/upsert-refrigerante-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class RefrigeranteService {
  constructor(
    @InjectRepository(RefrigeranteIngreso, 'DEV')
    private readonly refrigeranteIngresoRepo: Repository<RefrigeranteIngreso>,

    @InjectRepository(RefrigeranteTipo, 'DEV')
    private readonly refrigeranteTipoRepo: Repository<RefrigeranteTipo>,

    @InjectRepository(RefrigeranteEquipo, 'DEV')
    private readonly refrigeranteEquipoRepo: Repository<RefrigeranteEquipo>,
  ) {}

  async getAllRefrigeranteIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return this.refrigeranteIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
    });
  }

  upsertRefrigeranteIngreso = (dt: UpsertRefrigeranteIngresoDto, u: AuthUser) =>
    dt.id
      ? this.refrigeranteIngresoRepo.update(dt.id, { ...dt, persona_upsert: u.code })
      : this.refrigeranteIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllRefrigeranteTipo = () => this.refrigeranteTipoRepo.find();

  upsertRefrigeranteTipo = (dt: UpsertRefrigeranteTipoDto) =>
    dt.id
      ? this.refrigeranteTipoRepo.update(dt.id, dt)
      : this.refrigeranteTipoRepo.save(dt);

  deleteRefrigeranteTipo = (id: number) =>
    this.refrigeranteTipoRepo.update(id, { flag_activo: false });

  getAllRefrigeranteEquipo = () => this.refrigeranteEquipoRepo.find();

  upsertRefrigeranteEquipo = (dt: UpsertRefrigeranteEquipoDto) =>
    dt.id
      ? this.refrigeranteEquipoRepo.update(dt.id, dt)
      : this.refrigeranteEquipoRepo.save(dt);

  deleteRefrigeranteEquipo = (id: number) =>
    this.refrigeranteEquipoRepo.update(id, { flag_activo: false });
}
