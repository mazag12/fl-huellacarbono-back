import { Injectable } from '@nestjs/common';
import { Modulo } from './entities/modulo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { UpsertModuloDto } from './dto/upsert-modulo.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class ModuloService {
  constructor(
    @InjectRepository(Modulo, 'DEV')
    private readonly moduloRepository: Repository<Modulo>,
  ) {}

  async getAllModulos(pg: PaginationDto) {
    const where = createFilter(pg);
    const count = await this.moduloRepository.count({ where });
    const rows = await this.moduloRepository.find({
      where,
      take: pg.limit,
      skip: pg.offset,
      order: { id: 'ASC' },
    });
    return { count, rows };
  }

  upsertModulo = (dt: UpsertModuloDto, u: AuthUser) =>
    dt.id 
      ? this.methodDeleteIdFromDtoAndUpdate(dt.id, { ...dt, persona_upd: u.code })
      : this.moduloRepository.save({ ...dt, persona_ins: u.code });

  methodDeleteIdFromDtoAndUpdate = (id: number, dto) => {
    delete dto.id;
    return this.moduloRepository.update(id, dto);
  };
}
