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
    const where = {};
    if (pg.factura){
      where['factura'] = pg.factura;
    }
    if (pg.tipo){
      where['tipo_electricidad_id'] = pg.tipo;
    }
    if (pg.fecha){
      where['fecha_ingreso'] = pg.fecha;
    }
    const count = await this.transportePropioIngresoRepo.count({ where });
    const rows = await this.transportePropioIngresoRepo.find({
      where,
      take: pg.limit,
      skip: pg.offset,
      order: { id: 'DESC' },
    });
    return { count, rows };
  }

  upsertTransportePropioIngreso = (dt: UpsertTransportePropioIngresoDto, u: AuthUser) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, { ...dt, persona_upsert: u.code }, 'transportePropioIngresoRepo')
      : this.transportePropioIngresoRepo.save({ ...dt, persona_upsert: u.code });

  getAllTransportePropioTipo = () => this.transportePropioTipoRepo.find();

  upsertTransportePropioTipo = (dt: UpsertTransportePropioTipoDto) =>
    dt.id
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, dt, 'transportePropioTipoRepo')
      : this.transportePropioTipoRepo.save(dt);

  deleteTransportePropioTipo = (id: number) =>
    this.transportePropioTipoRepo.update(id, { flag_activo: false });

  methodDeleteIdFromDtoAndUpdate = (id: number, dto, repository) => {
    delete dto.id;
    return this[repository].update(id, dto);
  }
}
