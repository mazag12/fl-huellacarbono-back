import { Module } from '@nestjs/common';
import { TransporteCasaTrabajoService } from './transporte-casa-trabajo.service';
import { TransporteCasaTrabajoController } from './transporte-casa-trabajo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransporteCasaTrabajoIngreso } from './entities/transporte-casa-trabajo-ingreso';
import { TransporteCasaTrabajoTipo } from './entities/transporte-casa-trabajo-tipo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransporteCasaTrabajoIngreso, TransporteCasaTrabajoTipo], 'DEV'),
  ],
  controllers: [TransporteCasaTrabajoController],
  providers: [TransporteCasaTrabajoService],
})
export class TransporteCasaTrabajoModule {}
