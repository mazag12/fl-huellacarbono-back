import { Controller } from '@nestjs/common';
import { ElectricidadService } from './electricidad.service';

@Controller('electricidad')
export class ElectricidadController {
  constructor(private readonly electricidadService: ElectricidadService) {}
}
