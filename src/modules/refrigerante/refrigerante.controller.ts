import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { RefrigeranteService } from './refrigerante.service';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UpsertRefrigeranteIngresoDto } from './dto/upsert-refrigerante-ingreso.dto';
import PaginationDto from 'src/common/dto/pagination.dto';
import { UpsertRefrigeranteEquipoDto } from './dto/upsert-refrigerante-equipo.dto';
import { UpsertRefrigeranteTipoDto } from './dto/upsert-refrigerante-tipo.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { User } from 'src/auth/decorators/get-user.decorator';
import { GetReporteByTypeAndDateDto } from 'src/common/dto/get-reporte-by-type-and-date.dto';

@ApiBearerAuth()
@ApiTags('Refrigerante')
@Controller('refrigerante')
export class RefrigeranteController {
  constructor(private readonly refrigeranteService: RefrigeranteService) {}

  @Post('ingreso')
  upsertRefrigeranteIngreso(
    @Body() dt: UpsertRefrigeranteIngresoDto,
    @User() user: AuthUser
  ) {
    return this.refrigeranteService.upsertRefrigeranteIngreso(dt, user);
  }

  @Get('ingreso')
  getAllRefrigeranteIngreso(@Query() pg: PaginationDto) {
    return this.refrigeranteService.getAllRefrigeranteIngreso(pg);
  }

  @Get('tipo')
  getAllRefrigeranteTipo() {
    return this.refrigeranteService.getAllRefrigeranteTipo();
  }

  @Post('tipo')
  upsertRefrigeranteTipo(@Body() dt: UpsertRefrigeranteTipoDto) {
    return this.refrigeranteService.upsertRefrigeranteTipo(dt);
  }

  @Delete('tipo/:id')
  deleteRefrigeranteTipo(@Param('id') id: number) {
    return this.refrigeranteService.deleteRefrigeranteTipo(id);
  }

  @Get('equipo')
  getAllRefrigeranteEquipo() {
    return this.refrigeranteService.getAllRefrigeranteEquipo();
  }

  @Post('equipo')
  upsertRefrigeranteEquipo(@Body() dt: UpsertRefrigeranteEquipoDto) {
    return this.refrigeranteService.upsertRefrigeranteEquipo(dt);
  }

  @Delete('equipo/:id')
  deleteRefrigeranteEquipo(@Param('id') id: number) {
    return this.refrigeranteService.deleteRefrigeranteEquipo(id);
  }

  @Get('reporte')
  getReporteRefrigeranteByDate(@Query() dt: GetReporteByTypeAndDateDto) {
    return this.refrigeranteService.getReporteRefrigeranteByDate(dt);
  }
}
