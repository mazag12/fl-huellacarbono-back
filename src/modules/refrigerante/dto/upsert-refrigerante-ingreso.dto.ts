import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertRefrigeranteIngresoDto {
    
    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsNotEmpty()
    @IsNumber()
    tipo_refrigerante_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    equipo_refrigerante_id: number;
    
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
    porcentaje_fuga: number;
    
    @IsNotEmpty()
    @IsDateString()
    fecha_ingreso: string;

    @IsNotEmpty()
    @IsString()
    area: string;
    
    @IsNotEmpty()
    @IsNumber()
    fuga_uso: number;
    
    @IsNotEmpty()
    @IsNumber()
    tiempo_uso: number;
    
    @IsNotEmpty()
    @IsNumber()
    fraccion_disposicion: number;
    
    @IsNotEmpty()
    @IsNumber()
    fraccion_recuperacion: number;

    @IsOptional()
    @IsString()
    evidencia_url: string;
}