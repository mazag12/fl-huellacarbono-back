import { Module } from '@nestjs/common';
import { PapelService } from './papel.service';
import { PapelController } from './papel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PapelTipo } from './entities/papel-tipo.entity';
import { PapelIngreso } from './entities/papel-ingreso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PapelTipo, PapelIngreso], 'DEV'),
  ],
  controllers: [PapelController],
  providers: [PapelService],
})
export class PapelModule {}
