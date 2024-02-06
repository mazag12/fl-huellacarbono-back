import { Controller } from '@nestjs/common';
import { RefrigeranteService } from './refrigerante.service';

@Controller('refrigerante')
export class RefrigeranteController {
  constructor(private readonly refrigeranteService: RefrigeranteService) {}
}
