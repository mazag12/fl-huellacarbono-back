import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertAguaIngresoDto {
    
    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsNotEmpty()
    @IsNumber()
    medidor: number;
    
    @IsNotEmpty()
    @IsDateString()
    fecha_ingreso: string;

    @IsNotEmpty()
    @IsString()
    area: string;
}