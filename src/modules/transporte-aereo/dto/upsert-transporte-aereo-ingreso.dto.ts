import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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
    @IsString()
    fecha_ingreso: string;
    
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
}