import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AguaIngreso } from './entities/agua-ingreso.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AguaService {
  constructor(
    @InjectRepository(AguaIngreso, 'PROD')
    private readonly aguaIngresoRepo: Repository<AguaIngreso>,

    @InjectDataSource('PROD')
    private readonly PROD: DataSource,
  ) {}

  async getAllAguaIngreso() {
  }

  postAguaIngreso = (data /* Agregar el DTO a lo que resibiras en el body de tu peticion */) => 
    this.aguaIngresoRepo.save(data);

  updateAguaInhreso = (data) => this.aguaIngresoRepo.update(data.id, data);

  deleteAguaIngreso = (id) => this.aguaIngresoRepo.delete(id);
}
