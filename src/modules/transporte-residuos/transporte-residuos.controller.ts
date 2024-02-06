import { Controller } from '@nestjs/common';
import { TransporteResiduosService } from './transporte-residuos.service';

@Controller('transporte-residuos')
export class TransporteResiduosController {
  constructor(private readonly transporteResiduosService: TransporteResiduosService) {}
}
