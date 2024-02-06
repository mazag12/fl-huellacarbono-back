import { Module } from '@nestjs/common';
import { TransporteResiduosService } from './transporte-residuos.service';
import { TransporteResiduosController } from './transporte-residuos.controller';

@Module({
  controllers: [TransporteResiduosController],
  providers: [TransporteResiduosService],
})
export class TransporteResiduosModule {}
