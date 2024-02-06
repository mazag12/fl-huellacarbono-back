import { Module } from '@nestjs/common';
import { ConsumoSeinService } from './consumo-sein.service';
import { ConsumoSeinController } from './consumo-sein.controller';

@Module({
  controllers: [ConsumoSeinController],
  providers: [ConsumoSeinService],
})
export class ConsumoSeinModule {}
