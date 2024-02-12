import { Module } from '@nestjs/common';
import { TransporteInsumosService } from './transporte-insumos.service';
import { TransporteInsumosController } from './transporte-insumos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransporteInsumosIngreso } from './entities/transporte-insumos-ingreso.entity';
import { TransporteInsumosTipo } from './entities/transporte-insumos-tipo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransporteInsumosIngreso, TransporteInsumosTipo], 'DEV'),
  ],
  controllers: [TransporteInsumosController],
  providers: [TransporteInsumosService],
})
export class TransporteInsumosModule {}
