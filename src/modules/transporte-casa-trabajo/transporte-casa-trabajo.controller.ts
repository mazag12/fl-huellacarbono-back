import { Controller } from '@nestjs/common';
import { TransporteCasaTrabajoService } from './transporte-casa-trabajo.service';

@Controller('transporte-casa-trabajo')
export class TransporteCasaTrabajoController {
  constructor(private readonly transporteCasaTrabajoService: TransporteCasaTrabajoService) {}
}
