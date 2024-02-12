import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ElectricidadService } from './electricidad.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PaginationDto from 'src/common/dto/pagination.dto';
import { UpsertElectricidadTipoDto } from './dto/upsert-electricidad-tipo.dto';
import { UpsertElectricidadIngresoDto } from './dto/upsert-electricidad-ingreso.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { User } from 'src/auth/decorators/get-user.decorator';

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
}
