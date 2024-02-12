import { Module } from '@nestjs/common';
import { TransporteResiduosService } from './transporte-residuos.service';
import { TransporteResiduosController } from './transporte-residuos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransporteResiduosIngreso } from './entities/transporte-residuos-ingreso.entity';
import { TransporteResiduosTipo } from './entities/transporte-residuos-tipo.entity';
import { TransporteResiduosSed } from './entities/transporte-residuos-sed.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransporteResiduosIngreso, TransporteResiduosTipo, TransporteResiduosSed], 'DEV'),
  ],
  controllers: [TransporteResiduosController],
  providers: [TransporteResiduosService],
})
export class TransporteResiduosModule {}
