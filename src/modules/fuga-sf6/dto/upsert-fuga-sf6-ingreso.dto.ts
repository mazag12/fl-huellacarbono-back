import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertFugaSf6IngresoDto {

    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsNotEmpty()
    @IsNumber()
    tipo_fuga_sf6_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    cantidad: number;
    
    @IsNotEmpty()
    @IsNumber()
    capacidad_carga: number;
    
    @IsNotEmpty()
    @IsNumber()
    fuga_instalacion: number;
    
    @IsNotEmpty()
    @IsNumber()
    tiempo_uso: number;
    
    @IsNotEmpty()
    @IsNumber()
    fuga_uso: number;
    
    @IsNotEmpty()
    @IsNumber()
    fraccion_disposicion: number;
    
    @IsNotEmpty()
    @IsNumber()
    fraccion_recuperado: number;

    @IsNotEmpty()
    @IsDateString()
    fecha_ingreso: string;

    @IsNotEmpty()
    @IsString()
    area: string;

    @IsOptional()
    @IsString()
    evidencia_url: string;
}