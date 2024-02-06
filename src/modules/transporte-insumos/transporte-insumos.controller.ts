import { Controller } from '@nestjs/common';
import { TransporteInsumosService } from './transporte-insumos.service';

@Controller('transporte-insumos')
export class TransporteInsumosController {
  constructor(private readonly transporteInsumosService: TransporteInsumosService) {}
}
