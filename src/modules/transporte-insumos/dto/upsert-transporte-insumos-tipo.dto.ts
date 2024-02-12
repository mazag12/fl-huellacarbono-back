import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertTransporteInsumosTipoDto {
    
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;
    
    @IsNotEmpty()
    @IsNumber()
    co2: number;
}