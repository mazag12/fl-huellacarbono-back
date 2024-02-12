import { Module } from '@nestjs/common';
import { TransporteAereoService } from './transporte-aereo.service';
import { TransporteAereoController } from './transporte-aereo.controller';
import { TransporteAereoIngreso } from './entities/transporte-aereo-ingreso.entity';
import { TransporteAereoTipo } from './entities/transporte-aereo-tipo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransporteAereoIngreso, TransporteAereoTipo], 'DEV'),
  ],
  controllers: [TransporteAereoController],
  providers: [TransporteAereoService],
})
export class TransporteAereoModule {}
