import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TransporteAereoService } from './transporte-aereo.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpsertTransporteAereoIngresoDto } from './dto/upsert-transporte-aereo-ingreso.dto';
import { UpsertTransporteAereoTipoDto } from './dto/upsert-transporte-aereo-tipo.dto';
import PaginationDto from 'src/common/dto/pagination.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { User } from 'src/auth/decorators/get-user.decorator';

@ApiBearerAuth()
@ApiTags('Agua')
@Controller('transporte-aereo')
export class TransporteAereoController {
  constructor(private readonly transporteAereoService: TransporteAereoService) {}

  @Post('ingreso')
  upsertTransporteAereoIngreso(
    @Body() dt: UpsertTransporteAereoIngresoDto,
    @User() user: AuthUser
  ) {
    return this.transporteAereoService.upsertTransporteAereoIngreso(dt, user);
  }

  @Get('ingreso')
  getAllTransporteAereoIngreso(@Query() pg: PaginationDto) {
    return this.transporteAereoService.getAllTransporteAereoIngreso(pg);
  }

  @Get('tipo')
  getAllTransporteAereoTipo() {
    return this.transporteAereoService.getAllTransporteAereoTipo();
  }

  @Post('tipo')
  upsertTransporteAereoTipo(@Body() dt: UpsertTransporteAereoTipoDto) {
    return this.transporteAereoService.upsertTransporteAereoTipo(dt);
  }

  @Delete('tipo/:id')
  deleteTransporteAereoTipo(@Param('id') id: number) {
    return this.transporteAereoService.deleteTransporteAereoTipo(id);
  }
}
