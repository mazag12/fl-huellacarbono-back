import { Controller } from '@nestjs/common';
import { ConsumoSeinService } from './consumo-sein.service';

@Controller('consumo-sein')
export class ConsumoSeinController {
  constructor(private readonly consumoSeinService: ConsumoSeinService) {}
}
