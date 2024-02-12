import { Module } from '@nestjs/common';
import { FugaSf6Service } from './fuga-sf6.service';
import { FugaSf6Controller } from './fuga-sf6.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FugaSf6Ingreso } from './entities/fuga-sf6-ingreso.entity';
import { FugaSf6Tipo } from './entities/fuga-sf6-tipo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FugaSf6Ingreso, FugaSf6Tipo], 'DEV'),
  ],
  controllers: [FugaSf6Controller],
  providers: [FugaSf6Service],
})
export class FugaSf6Module {}
