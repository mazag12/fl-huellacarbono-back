import { Module } from '@nestjs/common';
import { AguaService } from './agua.service';
import { AguaController } from './agua.controller';

@Module({
  controllers: [AguaController],
  providers: [AguaService],
})
export class AguaModule {}
