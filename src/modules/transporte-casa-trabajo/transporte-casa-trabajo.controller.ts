import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TransporteCasaTrabajoService } from './transporte-casa-trabajo.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpsertTransporteCasaTrabajoIngresoDto } from './dto/upsert-transporte-casa-trabajo-ingreso.dto';
import PaginationDto from 'src/common/dto/pagination.dto';
import { UpsertTransporteCasaTrabajoTipoDto } from './dto/upsert-transporte-casa-trabajo-tipo.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { User } from 'src/auth/decorators/get-user.decorator';

@ApiBearerAuth()
@ApiTags('Transporte Casa Trabajo')
@Controller('transporte-casa-trabajo')
export class TransporteCasaTrabajoController {
  constructor(private readonly transporteCasaTrabajoService: TransporteCasaTrabajoService) {}

  @Post('ingreso')
  upsertTransporteCasaTrabajoIngreso(
    @Body() dt: UpsertTransporteCasaTrabajoIngresoDto,
    @User() user: AuthUser
  ) {
    return this.transporteCasaTrabajoService.upsertTransporteCasaTrabajoIngreso(dt, user);
  }

  @Get('ingreso')
  getAllTransporteCasaTrabajoIngreso(@Query() pg: PaginationDto) {
    return this.transporteCasaTrabajoService.getAllTransporteCasaTrabajoIngreso(pg);
  }

  @Get('tipo')
  getAllTransporteCasaTrabajoTipo() {
    return this.transporteCasaTrabajoService.getAllTransporteCasaTrabajoTipo();
  }

  @Post('tipo')
  upsertTransporteCasaTrabajoTipo(@Body() dt: UpsertTransporteCasaTrabajoTipoDto) {
    return this.transporteCasaTrabajoService.upsertTransporteCasaTrabajoTipo(dt);
  }

  @Delete('tipo/:id')
  deleteTransporteCasaTrabajoTipo(@Param('id') id: number) {
    return this.transporteCasaTrabajoService.deleteTransporteCasaTrabajoTipo(id);
  }
}
