import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateElectricidaDto } from './dto/create-electricida.dto';
import { UpdateElectricidaDto } from './dto/update-electricida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Electricida } from './entities/electricida.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ElectricidaService {

  constructor(@InjectRepository( Electricida) 
  private readonly electricidadRepository: Repository<Electricida>) {}

  async electricidad_guardar(createElectricidaDto: CreateElectricidaDto){
    try {

      const data_electricidad = this.electricidadRepository.create(createElectricidaDto)

      await this.electricidadRepository.save(data_electricidad);

      return data_electricidad;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al guardar la electricidad');
    }
  }

  async electricidad_editar(createElectricidaDto: CreateElectricidaDto){
    try {

      const data_electricidad = this.electricidadRepository.create(createElectricidaDto)

      await this.electricidadRepository.save(data_electricidad);

      return data_electricidad;
    } catch (error) {
      throw new InternalServerErrorException('Error al guardar la electricidad');
    }
  }

  async findOne(id : number){
    const electricidad = await this.electricidadRepository.findOneBy({ id });
    if ( !electricidad )
      throw new NotFoundException('No existe la selección');
    return electricidad;
  }
  
  async findRecibo(term : string){
    
    let Electricidad: Electricida;
    
    const queryBuilder = await this.electricidadRepository.createQueryBuilder();
    Electricidad = await queryBuilder.where('UPPER(factura) =:factura',{
      factura:term.toUpperCase()
    }).getOne();

    if ( !Electricidad )
      throw new NotFoundException('No existe la selección');
    return Electricidad;
  }

  findAll(paginationDto: PaginationDto){
    
    const {limit = 10, offset = 0} = paginationDto;
    
    return this.electricidadRepository.find({
      take:limit,
      skip:offset,
      //TODO : relaciones
    });
  }

  async electricidad_eliminar(id: number){
    const electricidad = await this.findOne( id );
    await this.electricidadRepository.remove(electricidad);
  }

  async update(id: number, electricidadDto: CreateElectricidaDto){
    const electricidad = await this.electricidadRepository.preload({
      id: +id,
      ...electricidadDto
    });

    if( !electricidad )
      throw new NotFoundException('Error no se encontro le id');

    try {
      await this.electricidadRepository.save(electricidad);
      return electricidad;
    } catch (error) {
      throw new InternalServerErrorException('Error al guardar la electricidad');
    }

  }

}
