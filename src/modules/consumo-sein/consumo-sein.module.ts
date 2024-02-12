import { Module } from '@nestjs/common';
import { ConsumoSeinService } from './consumo-sein.service';
import { ConsumoSeinController } from './consumo-sein.controller';
import { AguaModule } from '../agua/agua.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumoSeinIngreso } from './entities/consumo-sein-ingreso.entity';
import { ConsumoSeinTipo } from './entities/consumo-sein-tipo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsumoSeinIngreso, ConsumoSeinTipo], 'DEV'),
  ],
  controllers: [ConsumoSeinController],
  providers: [ConsumoSeinService],
})
export class ConsumoSeinModule {}
