import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpsertPapelTipoDto {
    
    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsNotEmpty()
    @IsNumber()
    nombre: string;
    
    @IsNotEmpty()
    @IsNumber()
    unidad: string;
    
    @IsNotEmpty()
    @IsNumber()
    co2: number;
}