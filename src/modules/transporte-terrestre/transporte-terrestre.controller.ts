import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TransporteTerrestreService } from './transporte-terrestre.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PaginationDto from 'src/common/dto/pagination.dto';
import { UpsertTransporteTerrestreIngresoDto } from './dto/upsert-transporte-terrestre-ingreso.dto';
import { UpsertTransporteTerrestreTipoDto } from './dto/upsert-transporte-terrestre-tipo.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { User } from 'src/auth/decorators/get-user.decorator';

@ApiBearerAuth()
@ApiTags('Transporte Terrestre')
@Controller('transporte-terrestre')
export class TransporteTerrestreController {
  constructor(private readonly transporteTerrestreService: TransporteTerrestreService) {}

  @Post('ingreso')
  upsertTransporteTerrestreIngreso(
    @Body() dt: UpsertTransporteTerrestreIngresoDto,
    @User() user: AuthUser
  ) {
    return this.transporteTerrestreService.upsertTransporteTerrestreIngreso(dt, user);
  }

  @Get('ingreso')
  getAllTransporteTerrestreIngreso(@Query() pg: PaginationDto) {
    return this.transporteTerrestreService.getAllTransporteTerrestreIngreso(pg);
  }

  @Get('tipo')
  getAllTransporteTerrestreTipo() {
    return this.transporteTerrestreService.getAllTransporteTerrestreTipo();
  }

  @Post('tipo')
  upsertTransporteTerrestreTipo(@Body() dt: UpsertTransporteTerrestreTipoDto) {
    return this.transporteTerrestreService.upsertTransporteTerrestreTipo(dt);
  }

  @Delete('tipo/:id')
  deleteTransporteTerrestreTipo(@Param('id') id: number) {
    return this.transporteTerrestreService.deleteTransporteTerrestreTipo(id);
  }
}
