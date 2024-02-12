import { Module } from '@nestjs/common';
import { ElectricidadService } from './electricidad.service';
import { ElectricidadController } from './electricidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectricidadIngreso } from './entities/electricidad-ingreso.entity';
import { ElectricidadTipo } from './entities/electricidad-tipo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ElectricidadIngreso, ElectricidadTipo], 'DEV'),
  ],
  controllers: [ElectricidadController],
  providers: [ElectricidadService],
})
export class ElectricidadModule {}
