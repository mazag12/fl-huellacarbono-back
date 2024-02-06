import { Controller } from '@nestjs/common';
import { PapelService } from './papel.service';

@Controller('papel')
export class PapelController {
  constructor(private readonly papelService: PapelService) {}
}
