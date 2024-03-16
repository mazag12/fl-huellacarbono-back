import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
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

    @InjectDataSource('DEV')
    private readonly DEV: DataSource,

  ) {}

  async getAllUsuarios(pg: PaginationDto) {
    let where;
    let count;
    let rows;

    if (pg.filter && pg.filter !== '') {
      let filterValue = pg.filter;
      where = await this.DEV.query(`
      SELECT email, isActive, id, code, nombre, apellido, role
      FROM tb_huellacarbono_user WHERE (
        id LIKE '%${filterValue}%'
        OR code LIKE '%${filterValue}%'
        OR email LIKE '%${filterValue}%'
        OR nombre LIKE '%${filterValue}%'
        OR apellido LIKE '%${filterValue}%'
      )`);
      
      count = where.length
      console.log(count)
      if(count=== 0){ 
        rows = []
      }else{
        rows = await this.userRepository.find({
          where,
          take: pg.limit,
          skip: pg.offset,
          order: { id: 'DESC' },
        });
      }
      console.log(rows)
      
    } else {
        where = createFilter(pg);   
        count = await this.userRepository.count({ where });
        rows = await this.userRepository.find({
          where,
          take: pg.limit,
          skip: pg.offset,
          order: { id: 'DESC' },
        });   
    }

    

    return { count, rows };  
  }

  getAllUsuarioIngresoById = (id : number) => this.userRepository.findOneBy({id});

  async deleteAcceso(id: number, u: AuthUser) {
    await this.accesosRepository.softDelete(id);
    return await this.accesosRepository.update(id, { persona_upd: u.code });
  }

  //postAcceso = ({ modulo_id, user_id }: PostAccesoDto, u: AuthUser) => this.accesosRepository.save({ modulo_id, user_id, persona_ins: u.code });

  postAcceso (dt: PostAccesoDto, u: AuthUser){
    if(dt.id){
      this.methodDeleteIdFromDtoAndUpdate(dt.user_id, dt.modulo_id, u.code);
      return {message:"Se actualizo correctamente"};
    }else{
      delete dt.id;
      return this.accesosRepository.save({ ...dt, persona_ins: u.code });
    }
  }

  methodDeleteIdFromDtoAndUpdate = async (user_id: number, modulo_id: number, use: string)  => 
  this.DEV.query(`Update tb_huellacarbono_acceso Set updatedAt = GETDATE(), deletedAt = NULL, persona_upd = '${use}'
  WHERE user_id = '${user_id}' and modulo_id = '${modulo_id}';`);

  


} 
