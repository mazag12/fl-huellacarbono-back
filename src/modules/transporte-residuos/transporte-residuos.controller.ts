import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TransporteResiduosService } from './transporte-residuos.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PaginationDto from 'src/common/dto/pagination.dto';
import { UpsertTransporteResiduosIngresoDto } from './dto/upsert-transporte-residuos-ingreso.dto';
import { UpsertTransporteResiduosTipoDto } from './dto/upsert-transporte-residuos-tipo.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { User } from 'src/auth/decorators/get-user.decorator';

@ApiBearerAuth()
@ApiTags('Transporte Residuos')
@Controller('transporte-residuos')
export class TransporteResiduosController {
  constructor(private readonly transporteResiduosService: TransporteResiduosService) {}

  @Post('ingreso')
  upsertTransporteResiduosIngreso(
    @Body() dt: UpsertTransporteResiduosIngresoDto,
    @User() user: AuthUser
  ) {
    return this.transporteResiduosService.upsertTransporteResiduosIngreso(dt, user);
  }

  @Get('ingreso')
  getAllTransporteResiduosIngreso(@Query() pg: PaginationDto) {
    return this.transporteResiduosService.getAllTransporteResiduosIngreso(pg);
  }

  @Get('tipo')
  getAllTransporteResiduosTipo() {
    return this.transporteResiduosService.getAllTransporteResiduosTipo();
  }

  @Post('tipo')
  upsertTransporteResiduosTipo(@Body() dt: UpsertTransporteResiduosTipoDto) {
    return this.transporteResiduosService.upsertTransporteResiduosTipo(dt);
  }

  @Delete('tipo/:id')
  deleteTransporteResiduosTipo(@Param('id') id: number) {
    return this.transporteResiduosService.deleteTransporteResiduosTipo(id);
  }
}
