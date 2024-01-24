import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCombustiblea1Dto } from './dto/create-combustiblea1.dto';
import { UpdateCombustiblea1Dto } from './dto/update-combustiblea1.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Combustiblea1 } from './entities/combustiblea1.entity';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class Combustiblea1Service {
  constructor(@InjectRepository( Combustiblea1) 
  private readonly combustiblea1Repository: Repository<Combustiblea1>) {}

  async Combustiblea1_guardar(combustiblea1Dto: CreateCombustiblea1Dto){
    try {

      const data_combustiblea1Dto = this.combustiblea1Repository.create(combustiblea1Dto)

      await this.combustiblea1Repository.save(data_combustiblea1Dto);

      return data_combustiblea1Dto;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al guardar la Combustiblea1');
    }
  }

  async Combustiblea1_editar(Combustiblea1Dto: CreateCombustiblea1Dto){
    try {

      const data_combustiblea1 = this.combustiblea1Repository.create(Combustiblea1Dto)

      await this.combustiblea1Repository.save(data_combustiblea1);

      return data_combustiblea1;
    } catch (error) {
      throw new InternalServerErrorException('Error al guardar la Combustiblea1');
    }
  }

  async findOne(id : number){
    const Combustiblea1 = await this.combustiblea1Repository.findOneBy({ id });
    if ( !Combustiblea1 )
      throw new NotFoundException('No existe la selección');
    return Combustiblea1;
  }
  
  async findRecibo(term : string){
    
    let Combustiblea1: Combustiblea1;
    
    const queryBuilder = await this.combustiblea1Repository.createQueryBuilder();
    Combustiblea1 = await queryBuilder.where('UPPER(factura) =:factura',{
      factura:term.toUpperCase()
    }).getOne();

    if ( !Combustiblea1 )
      throw new NotFoundException('No existe la selección');
    return Combustiblea1;
  }

  async findAll(){
    return await this.combustiblea1Repository.find();
  }

  async Combustiblea1_eliminar(id: number){
    const Combustiblea1 = await this.findOne( id );
    await this.combustiblea1Repository.remove(Combustiblea1);
  }

  async update(id: number, Combustiblea1Dto: CreateCombustiblea1Dto){
    const Combustiblea1 = await this.combustiblea1Repository.preload({
      id: +id,
      ...Combustiblea1Dto
    });

    if( !Combustiblea1 )
      throw new NotFoundException('Error no se encontro le id');

    try {
      await this.combustiblea1Repository.save(Combustiblea1);
      return Combustiblea1;
    } catch (error) {
      throw new InternalServerErrorException('Error al guardar la Combustiblea1');
    }

  }
}
