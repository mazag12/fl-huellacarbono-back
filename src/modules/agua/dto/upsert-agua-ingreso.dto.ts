import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

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

    @IsOptional()
    @IsString()
    evidencia_url: string;

    @IsNotEmpty()
    @IsString()
    area: string;
}