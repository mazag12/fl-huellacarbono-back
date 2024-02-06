import { Module } from '@nestjs/common';
import { AguaService } from './agua.service';
import { AguaController } from './agua.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AguaIngreso } from './entities/agua-ingreso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AguaIngreso], 'PROD'),
  ],
  controllers: [AguaController],
  providers: [AguaService],
  exports: [
    //* En caso se necesite usar los metodos del servicio en otro modulo: AguaService
  ]
})
export class AguaModule {}
