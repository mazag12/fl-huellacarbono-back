import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Combustiblea1Service } from './combustiblea1.service';
import { CreateCombustiblea1Dto } from './dto/create-combustiblea1.dto';
import { UpdateCombustiblea1Dto } from './dto/update-combustiblea1.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('combustiblea1')
export class Combustiblea1Controller {
  constructor(private readonly combustiblea1Service: Combustiblea1Service) {}

  @Post()
  create(@Body() createCombustiblea1Dto: CreateCombustiblea1Dto) {
    return this.combustiblea1Service.Combustiblea1_guardar(createCombustiblea1Dto);
  }

  @Get()
  findAll() {
    return this.combustiblea1Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.combustiblea1Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCombustiblea1Dto: UpdateCombustiblea1Dto) {
    return this.combustiblea1Service.update(+id, updateCombustiblea1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.combustiblea1Service.Combustiblea1_eliminar(+id);
  }
}
