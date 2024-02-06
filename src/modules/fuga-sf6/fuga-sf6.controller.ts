import { Controller } from '@nestjs/common';
import { FugaSf6Service } from './fuga-sf6.service';

@Controller('fuga-sf6')
export class FugaSf6Controller {
  constructor(private readonly fugaSf6Service: FugaSf6Service) {}
}
