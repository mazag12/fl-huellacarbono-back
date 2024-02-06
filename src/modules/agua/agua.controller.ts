import { Controller } from '@nestjs/common';
import { AguaService } from './agua.service';

@Controller('agua')
export class AguaController {
  constructor(private readonly aguaService: AguaService) {}
}
