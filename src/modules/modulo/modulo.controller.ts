import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PaginationDto from 'src/common/dto/pagination.dto';
import { UpsertModuloDto } from './dto/upsert-modulo.dto';
import { User } from 'src/auth/decorators/get-user.decorator';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@ApiBearerAuth()
@ApiTags('Administracion Modulos')
@Controller('modulo')
export class ModuloController {
  constructor(private readonly moduloService: ModuloService) {}

  @Get()
  getAllModulos(@Query() pg: PaginationDto) {
    return this.moduloService.getAllModulos(pg);
  }

  @Post()
  upsertModulo(@Body() dt: UpsertModuloDto, @User() u: AuthUser) {
    return this.moduloService.upsertModulo(dt, u);
  }

}
