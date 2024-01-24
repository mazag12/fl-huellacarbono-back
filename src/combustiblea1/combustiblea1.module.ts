import { Module } from '@nestjs/common';
import { Combustiblea1Service } from './combustiblea1.service';
import { Combustiblea1Controller } from './combustiblea1.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combustiblea1 } from './entities/combustiblea1.entity';

@Module({
  controllers: [Combustiblea1Controller],
  providers: [Combustiblea1Service],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Combustiblea1]),
  ],
  exports: [ TypeOrmModule]
})
export class Combustiblea1Module {}
