import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import PaginationDto from 'src/common/dto/pagination.dto';
import { createFilter } from 'src/common/utils/filter';
import { AuthUser } from './interfaces/auth-user.interface';
import { Accesos } from './entities/accesos.entity';
import { PostAccesoDto } from './dto/post-acceso.dto';
import { CreateUsuarioDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'DEV')
    private readonly userRepository: Repository<User>,

    @InjectRepository(Accesos, 'DEV')
    private readonly accesosRepository: Repository<Accesos>,
  ) {}

  async getAllUsuarios(pg: PaginationDto) {
    const where = createFilter(pg);

    const count = await this.userRepository.count({ where });
    const rows = await this.userRepository.find({
      where,
      take: pg.limit,
      skip: pg.offset,
      order: { id: 'DESC' },
    });

    return { count, rows };
  }

  getAllUsuarioIngresoById = (id : number) => this.userRepository.findOneBy({id});

  async deleteAcceso(id: number, u: AuthUser) {
    await this.accesosRepository.softDelete(id);
    return await this.accesosRepository.update(id, { persona_upd: u.code });
  }

  postAcceso = ({ modulo_id, user_id }: PostAccesoDto, u: AuthUser) => this.accesosRepository.save({ modulo_id, user_id, persona_ins: u.code });
  
}
