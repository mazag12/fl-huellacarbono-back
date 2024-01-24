import { Module } from '@nestjs/common';
import { ElectricidaService } from './electricida.service';
import { ElectricidaController } from './electricida.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Electricida } from './entities/electricida.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ElectricidaController],
  providers: [ElectricidaService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Electricida]),
  ],
  exports: [ TypeOrmModule]
})
export class ElectricidaModule {}
