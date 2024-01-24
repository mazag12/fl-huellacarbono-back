import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ElectricidaService } from './electricida.service';
import { CreateElectricidaDto } from './dto/create-electricida.dto';
import { UpdateElectricidaDto } from './dto/update-electricida.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('electricida')
export class ElectricidaController {
  constructor(private readonly electricidaService: ElectricidaService) {}

  @Post()
  create_electricidad (@Body() electricidadDto: CreateElectricidaDto){
    return this.electricidaService.electricidad_guardar(electricidadDto);
  }

  @Get(':id')
  finOne_electricidad (@Param('id') id: number )  {
    return this.electricidaService.findOne(id);
  }

  @Get('factura/:term')
  findFactura_electricidad (@Param('term') term: string )  {
    return this.electricidaService.findRecibo(term);
  }

  @Get()
  finAll_electricidad (@Query() paginationDto: PaginationDto)  {
    return this.electricidaService.findAll(paginationDto);
  }

  @Patch(':id')
  update_electricidad(@Param('id') id:number,@Body()  electricidadDto: CreateElectricidaDto){
    return this.electricidaService.update(id, electricidadDto);
  }
  
}
