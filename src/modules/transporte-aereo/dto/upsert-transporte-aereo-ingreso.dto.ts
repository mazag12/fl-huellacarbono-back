import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertTransporteAereoIngresoDto {
    
    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsNotEmpty()
    @IsNumber()
    tipo_transporte_aereo_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    cantidad: number;
    
    @IsNotEmpty()
    @IsDateString()
    fecha_ingreso: string;

    @IsNotEmpty()
    @IsString()
    area: string;
    
    @IsNotEmpty()
    @IsString()
    factura: string;
    
    @IsNotEmpty()
    @IsNumber()
    tramo: number;
    
    @IsNotEmpty()
    @IsNumber()
    distancia: number;
    
    @IsNotEmpty()
    @IsNumber()
    numero_personas: number;
    
    @IsNotEmpty()
    @IsNumber()
    numero_recorridos: number;

    @IsOptional()
    @IsString()
    evidencia_url: string;
}