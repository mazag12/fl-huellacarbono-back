import { Controller } from '@nestjs/common';
import { TransportePropioService } from './transporte-propio.service';

@Controller('transporte-propio')
export class TransportePropioController {
  constructor(private readonly transportePropioService: TransportePropioService) {}
}
