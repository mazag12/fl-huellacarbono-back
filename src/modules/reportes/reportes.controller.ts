import { Controller, Get, Query } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { GetReporteByTypeAndDateDto } from '../../common/dto/get-reporte-by-type-and-date.dto';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Reportes')
@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  // @Get()
  // getReporteByTypeAndDate(
  //   @Query() dto: GetReporteByTypeAndDateDto
  // ) {
  //   return this.reportesService.getReporteByTypeAndDate(dto);
  // }
}
