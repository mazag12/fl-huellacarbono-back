import { Module } from '@nestjs/common';
import { ElectricidadService } from './electricidad.service';
import { ElectricidadController } from './electricidad.controller';

@Module({
  controllers: [ElectricidadController],
  providers: [ElectricidadService],
})
export class ElectricidadModule {}
