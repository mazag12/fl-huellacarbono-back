import { Module } from '@nestjs/common';
import { TransportePropioService } from './transporte-propio.service';
import { TransportePropioController } from './transporte-propio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportePropioIngreso } from './entities/transporte-propio-ingreso.entity';
import { TransportePropioTipo } from './entities/transporte-propio-tipo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransportePropioIngreso, TransportePropioTipo], 'DEV'),
  ],
  controllers: [TransportePropioController],
  providers: [TransportePropioService],
})
export class TransportePropioModule {}
