import { Module } from '@nestjs/common';
import { TransporteAereoService } from './transporte-aereo.service';
import { TransporteAereoController } from './transporte-aereo.controller';

@Module({
  controllers: [TransporteAereoController],
  providers: [TransporteAereoService],
})
export class TransporteAereoModule {}
