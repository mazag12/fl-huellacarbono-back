import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TransportePropioService } from './transporte-propio.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PaginationDto from 'src/common/dto/pagination.dto';
import { UpsertTransportePropioIngresoDto } from './dto/upsert-transporte-propio-ingreso.dto';
import { UpsertTransportePropioTipoDto } from './dto/upsert-transporte-propio-tipo.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { User } from 'src/auth/decorators/get-user.decorator';

@ApiBearerAuth()
@ApiTags('Transporte Propio')
@Controller('transporte-propio')
export class TransportePropioController {
  constructor(private readonly transportePropioService: TransportePropioService) {}

  @Post('ingreso')
  upsertTransportePropioIngreso(
    @Body() dt: UpsertTransportePropioIngresoDto,
    @User() user: AuthUser
  ) {
    return this.transportePropioService.upsertTransportePropioIngreso(dt, user);
  }

  @Get('ingreso')
  getAllTransportePropioIngreso(@Query() pg: PaginationDto) {
    return this.transportePropioService.getAllTransportePropioIngreso(pg);
  }

  @Get('tipo')
  getAllTransportePropioTipo() {
    return this.transportePropioService.getAllTransportePropioTipo();
  }

  @Post('tipo')
  upsertTransportePropioTipo(@Body() dt: UpsertTransportePropioTipoDto) {
    return this.transportePropioService.upsertTransportePropioTipo(dt);
  }

  @Delete('tipo/:id')
  deleteTransportePropioTipo(@Param('id') id: number) {
    return this.transportePropioService.deleteTransportePropioTipo(id);
  }
}
