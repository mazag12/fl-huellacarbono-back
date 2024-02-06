import { Module } from '@nestjs/common';
import { TransporteInsumosService } from './transporte-insumos.service';
import { TransporteInsumosController } from './transporte-insumos.controller';

@Module({
  controllers: [TransporteInsumosController],
  providers: [TransporteInsumosService],
})
export class TransporteInsumosModule {}
