import { Module } from '@nestjs/common';
import { ConsumoSeinService } from './consumo-sein.service';
import { ConsumoSeinController } from './consumo-sein.controller';
import { AguaModule } from '../agua/agua.module';

@Module({
  imports: [
    //* En caso desees usar service en este modulo: AguaModule
  ],
  controllers: [ConsumoSeinController],
  providers: [ConsumoSeinService],
})
export class ConsumoSeinModule {}
