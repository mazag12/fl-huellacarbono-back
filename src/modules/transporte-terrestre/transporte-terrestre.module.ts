import { Module } from '@nestjs/common';
import { TransporteTerrestreService } from './transporte-terrestre.service';
import { TransporteTerrestreController } from './transporte-terrestre.controller';

@Module({
  controllers: [TransporteTerrestreController],
  providers: [TransporteTerrestreService],
})
export class TransporteTerrestreModule {}
