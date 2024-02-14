import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ConsumoSeinService } from './consumo-sein.service';
import { UpsertConsumoSeinTipoDto } from './dto/upsert-consumo-sein-tipo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpsertConsumoSeinIngresoDto } from './dto/upsert-consumo-sein-ingreso.dto';
import PaginationDto from 'src/common/dto/pagination.dto';
import { User } from 'src/auth/decorators/get-user.decorator';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { GetReporteByTypeAndDateDto } from 'src/common/dto/get-reporte-by-type-and-date.dto';

@ApiBearerAuth()
@ApiTags('Consumo Sein')
@Controller('consumo-sein')
export class ConsumoSeinController {
  constructor(private readonly consumoSeinService: ConsumoSeinService) {}

  @Post('ingreso')
  upsertConsumoSeinIngreso(
    @Body() dt: UpsertConsumoSeinIngresoDto,
    @User() user: AuthUser
  ) {
    return this.consumoSeinService.upsertConsumoSeinIngreso(dt, user);
  }

  @Get('ingreso')
  getAllConsumoSeinIngreso(@Query() pg: PaginationDto) {
    return this.consumoSeinService.getAllConsumoSeinIngreso(pg);
  }

  @Get('tipo')
  getAllConsumoSeinTipo() {
    return this.consumoSeinService.getAllConsumoSeinTipo();
  }

  @Post('tipo')
  upsertConsumoSeinTipo(@Body() dt: UpsertConsumoSeinTipoDto) {
    return this.consumoSeinService.upsertConsumoSeinTipo(dt);
  }

  @Delete('tipo/:id')
  deleteConsumoSeinTipo(@Param('id') id: number) {
    return this.consumoSeinService.deleteConsumoSeinTipo(id);
  }

  @Get('reporte')
  getReporteConsumoSeinByDate(@Query() dt: GetReporteByTypeAndDateDto) {
    return this.consumoSeinService.getReporteConsumoSeinByDate(dt);
  }
}
