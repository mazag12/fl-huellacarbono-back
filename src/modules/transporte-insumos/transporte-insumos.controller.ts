import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TransporteInsumosService } from './transporte-insumos.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PaginationDto from 'src/common/dto/pagination.dto';
import { UpsertTransporteInsumosIngresoDto } from './dto/upsert-transporte-insumos-ingreso.dto';
import { UpsertTransporteInsumosTipoDto } from './dto/upsert-transporte-insumos-tipo.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { User } from 'src/auth/decorators/get-user.decorator';

@ApiBearerAuth()
@ApiTags('Transporte Insumos')
@Controller('transporte-insumos')
export class TransporteInsumosController {
  constructor(private readonly transporteInsumosService: TransporteInsumosService) {}

  @Post('ingreso')
  upsertTransporteInsumosIngreso(
    @Body() dt: UpsertTransporteInsumosIngresoDto,
    @User() user: AuthUser
  ) {
    return this.transporteInsumosService.upsertTransporteInsumosIngreso(dt, user);
  }

  @Get('ingreso')
  getAllTransporteInsumosIngreso(@Query() pg: PaginationDto) {
    return this.transporteInsumosService.getAllTransporteInsumosIngreso(pg);
  }

  @Get('tipo')
  getAllTransporteInsumosTipo() {
    return this.transporteInsumosService.getAllTransporteInsumosTipo();
  }

  @Post('tipo')
  upsertTransporteInsumosTipo(@Body() dt: UpsertTransporteInsumosTipoDto) {
    return this.transporteInsumosService.upsertTransporteInsumosTipo(dt);
  }

  @Delete('tipo/:id')
  deleteTransporteInsumosTipo(@Param('id') id: number) {
    return this.transporteInsumosService.deleteTransporteInsumosTipo(id);
  }
}
