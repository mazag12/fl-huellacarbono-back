import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateCombustiblea1Dto {

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
