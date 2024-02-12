import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertTransporteTerrestreTipoDto {
    
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;
    
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