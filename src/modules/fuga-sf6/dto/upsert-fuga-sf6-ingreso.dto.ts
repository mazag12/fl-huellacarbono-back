import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

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
    fecha_ingreso: string;
}