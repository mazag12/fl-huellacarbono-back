import { Controller } from '@nestjs/common';
import { TransporteAereoService } from './transporte-aereo.service';

@Controller('transporte-aereo')
export class TransporteAereoController {
  constructor(private readonly transporteAereoService: TransporteAereoService) {}
}
