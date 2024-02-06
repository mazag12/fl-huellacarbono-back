import { Module } from '@nestjs/common';
import { TransportePropioService } from './transporte-propio.service';
import { TransportePropioController } from './transporte-propio.controller';

@Module({
  controllers: [TransportePropioController],
  providers: [TransportePropioService],
})
export class TransportePropioModule {}
