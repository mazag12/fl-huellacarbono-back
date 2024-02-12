import { Module } from '@nestjs/common';
import { RefrigeranteService } from './refrigerante.service';
import { RefrigeranteController } from './refrigerante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefrigeranteIngreso } from './entities/refrigerante-ingreso.entity';
import { RefrigeranteEquipo } from './entities/refrigerante-equipo.entity';
import { RefrigeranteTipo } from './entities/refrigerante-tipo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefrigeranteIngreso, RefrigeranteEquipo, RefrigeranteTipo], 'DEV')
  ],
  controllers: [RefrigeranteController],
  providers: [RefrigeranteService],
})
export class RefrigeranteModule {}
