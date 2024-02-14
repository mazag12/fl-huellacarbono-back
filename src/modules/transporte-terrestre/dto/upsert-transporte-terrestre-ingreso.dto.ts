import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertTransporteTerrestreIngresoDto {
    
    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsNotEmpty()
    @IsNumber()
    tipo_transporte_terrestre_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    cantidad: number;
    
    @IsNotEmpty()
    @IsDateString()
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
    @IsBoolean()
    flag_ida_vuelta: boolean;
    
    @IsNotEmpty()
    @IsNumber()
    numero_recorridos: number;
    
    @IsNotEmpty()
    @IsNumber()
    numero_personas: number;

    @IsNotEmpty()
    @IsString()
    area: string;

    @IsOptional()
    @IsString()
    evidencia_url: string;
}