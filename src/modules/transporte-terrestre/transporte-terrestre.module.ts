import { Module } from '@nestjs/common';
import { TransporteTerrestreService } from './transporte-terrestre.service';
import { TransporteTerrestreController } from './transporte-terrestre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransporteTerrestreIngreso } from './entities/transporte-terrestre-ingreso.entity';
import { TransporteTerrestreTipo } from './entities/transporte-terrestre-tipo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransporteTerrestreIngreso, TransporteTerrestreTipo], 'DEV'),
  ],
  controllers: [TransporteTerrestreController],
  providers: [TransporteTerrestreService],
})
export class TransporteTerrestreModule {}
