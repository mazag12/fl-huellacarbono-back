import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { ConsumoSeinModule } from '../consumo-sein/consumo-sein.module';
import { ElectricidadModule } from '../electricidad/electricidad.module';

@Module({
  imports: [
    ConsumoSeinModule,
    ElectricidadModule
  ],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
