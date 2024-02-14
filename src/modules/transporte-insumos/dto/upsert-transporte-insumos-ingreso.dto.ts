import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertTransporteInsumosIngresoDto {
    
    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsNotEmpty()
    @IsNumber()
    tipo_transporte_insumos_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    cantidad: number;
    
    @IsNotEmpty()
    @IsDateString()
    fecha_ingreso: string;
    
    @IsNotEmpty()
    @IsString()
    descripcion_carga: string;
    
    @IsNotEmpty()
    @IsNumber()
    viajes_totales: number;
    
    @IsNotEmpty()
    @IsNumber()
    tramo_viaje: number;
    
    @IsNotEmpty()
    @IsNumber()
    peso: number;
    
    @IsNotEmpty()
    @IsNumber()
    distancia: number;

    @IsNotEmpty()
    @IsString()
    area: string;

    @IsOptional()
    @IsString()
    evidencia_url: string;
}