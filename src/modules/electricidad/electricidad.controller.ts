import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ElectricidadService } from './electricidad.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PaginationDto from 'src/common/dto/pagination.dto';
import { UpsertElectricidadTipoDto } from './dto/upsert-electricidad-tipo.dto';
import { UpsertElectricidadIngresoDto } from './dto/upsert-electricidad-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { User } from 'src/auth/decorators/get-user.decorator';
import { GetReporteByTypeAndDateDto } from '../../common/dto/get-reporte-by-type-and-date.dto';
import { GetIdByTypeFacturaTipo } from 'src/common/dto/get-id-by-factura-and-tipo.dto';

@ApiBearerAuth()
@ApiTags('Electricidad')
@Controller('electricidad')
export class ElectricidadController {
  constructor(private readonly electricidadService: ElectricidadService) {}

  @Post('ingreso')
  upsertElectricidadIngreso(
    @Body() dt: UpsertElectricidadIngresoDto,
    @User() user: AuthUser
  ) {
    return this.electricidadService.upsertElectricidadIngreso(dt, user);
  }

  @Get('ingreso')
  getAllElectricidadIngreso(@Query() pg: PaginationDto) {
    return this.electricidadService.getAllElectricidadIngreso(pg);
  }

  @Get('ingreso/:id')
  getElectricidadIngreso(@Param('id') id: number) {
    return this.electricidadService.getElectricidadIngreso(id);
  }

  @Get('factura')
  getElectricidadIngresoByFactura(@Query() pg: GetIdByTypeFacturaTipo) {
    return this.electricidadService.getElectricidadByFactura(pg);
  }

  @Get('tipo')
  getAllElectricidadTipo() {
    return this.electricidadService.getAllElectricidadTipo();
  }

  @Post('tipo')
  upsertElectricidadTipo(@Body() dt: UpsertElectricidadTipoDto) {
    return this.electricidadService.upsertElectricidadTipo(dt);
  }

  @Delete('tipo/:id')
  deleteElectricidadTipo(@Param('id') id: number) {
    return this.electricidadService.deleteElectricidadTipo(id);
  }

  @Get('reporte')
  getReporteElectricidadByDate(@Query() dto: GetReporteByTypeAndDateDto) {
    return this.electricidadService.getReporteElectricidadByDate(dto);
  }
}
