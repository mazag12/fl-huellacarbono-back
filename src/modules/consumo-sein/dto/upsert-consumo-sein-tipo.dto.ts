import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertConsumoSeinTipoDto {

    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsString()
    unidad: string;
    
    @IsNotEmpty()
    @IsNumber()
    factor: number;
    
    @IsNotEmpty()
    @IsNumber()
    co2: number;
    
    @IsNotEmpty()
    @IsNumber()
    ch4: number;
    
    @IsNotEmpty()
    @IsNumber()
    n2o: number;
}