import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransporteInsumosIngreso } from './entities/transporte-insumos-ingreso.entity';
import { TransporteInsumosTipo } from './entities/transporte-insumos-tipo.entity';
import PaginationDto from 'src/common/dto/pagination.dto';
import { UpsertTransporteInsumosTipoDto } from './dto/upsert-transporte-insumos-tipo.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertTransporteInsumosIngresoDto } from './dto/upsert-transporte-insumos-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class TransporteInsumosService {
  constructor(
    @InjectRepository(TransporteInsumosIngreso, 'DEV')
    private readonly transporteInsumosIngresoRepo: Repository<TransporteInsumosIngreso>,

    @InjectRepository(TransporteInsumosTipo, 'DEV')
    private readonly transporteInsumosTipoRepo: Repository<TransporteInsumosTipo>,
  ) {}

  async getAllTransporteInsumosIngreso(pg: PaginationDto) {
    const where = createFilter(pg);
    return this.transporteInsumosIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
    });
  }

  upsertTransporteInsumosIngreso = (dt: UpsertTransporteInsumosIngresoDto, u: AuthUser) =>
    dt.id
      ? this.transporteInsumosIngresoRepo.update(dt.id, { ...dt, persona_upsert: u.code })
      : this.transporteInsumosIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllTransporteInsumosTipo = () => this.transporteInsumosTipoRepo.find();

  upsertTransporteInsumosTipo = (dt: UpsertTransporteInsumosTipoDto) =>
    dt.id
      ? this.transporteInsumosTipoRepo.update(dt.id, dt)
      : this.transporteInsumosTipoRepo.save(dt);

  deleteTransporteInsumosTipo = (id: number) =>
    this.transporteInsumosTipoRepo.update(id, { flag_activo: false });
}
