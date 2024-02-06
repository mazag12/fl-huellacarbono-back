import { Controller } from '@nestjs/common';
import { TransporteTerrestreService } from './transporte-terrestre.service';

@Controller('transporte-terrestre')
export class TransporteTerrestreController {
  constructor(private readonly transporteTerrestreService: TransporteTerrestreService) {}
}
