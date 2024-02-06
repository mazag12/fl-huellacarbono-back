import { Module } from '@nestjs/common';
import { FugaSf6Service } from './fuga-sf6.service';
import { FugaSf6Controller } from './fuga-sf6.controller';

@Module({
  controllers: [FugaSf6Controller],
  providers: [FugaSf6Service],
})
export class FugaSf6Module {}
