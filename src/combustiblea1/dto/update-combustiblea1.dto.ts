import { PartialType } from '@nestjs/mapped-types';
import { CreateCombustiblea1Dto } from './create-combustiblea1.dto';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateCombustiblea1Dto extends PartialType(CreateCombustiblea1Dto) {

    @IsString()
    combustible: string;

    @IsString()
    unidad: string;

    @IsNumber()
    @IsPositive()
    neto: number;

    @IsNumber()
    @IsPositive()
    co2: number;

    @IsNumber()
    @IsPositive()
    ch4: number;

    @IsNumber()
    @IsPositive()
    n2o: number;

}
