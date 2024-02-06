import { Module } from '@nestjs/common';
import { PapelService } from './papel.service';
import { PapelController } from './papel.controller';

@Module({
  controllers: [PapelController],
  providers: [PapelService],
})
export class PapelModule {}
