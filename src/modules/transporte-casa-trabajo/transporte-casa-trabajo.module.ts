import { Module } from '@nestjs/common';
import { TransporteCasaTrabajoService } from './transporte-casa-trabajo.service';
import { TransporteCasaTrabajoController } from './transporte-casa-trabajo.controller';

@Module({
  controllers: [TransporteCasaTrabajoController],
  providers: [TransporteCasaTrabajoService],
})
export class TransporteCasaTrabajoModule {}
