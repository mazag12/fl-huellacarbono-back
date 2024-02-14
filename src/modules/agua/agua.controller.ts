import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AguaService } from './agua.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PaginationDto from 'src/common/dto/pagination.dto';
import { UpsertAguaIngresoDto } from './dto/upsert-agua-ingreso.dto';
import { User } from 'src/auth/decorators/get-user.decorator';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { GetReporteByTypeAndDateDto } from 'src/common/dto/get-reporte-by-type-and-date.dto';

@ApiBearerAuth()
@ApiTags('Agua')
@Controller('agua')
export class AguaController {
  constructor(private readonly aguaService: AguaService) {}

  @Post('ingreso')
  upsertAguaIngreso(
    @Body() dt: UpsertAguaIngresoDto,
    @User() user: AuthUser
  ) {
    return this.aguaService.upsertAguaIngreso(dt, user);
  }

  @Get('ingreso')
  getAllAguaIngreso(@Query() pg: PaginationDto) {
    return this.aguaService.getAllAguaIngreso(pg);
  }

  @Get('reporte')
  getReporteAguaByDate(@Query() dt: GetReporteByTypeAndDateDto) {
    return this.aguaService.getReporteAguaByDate(dt);
  }
}
