import { PartialType } from '@nestjs/mapped-types';
import { CreateElectricidaDto } from './create-electricida.dto';

export class UpdateElectricidaDto extends PartialType(CreateElectricidaDto) {}
