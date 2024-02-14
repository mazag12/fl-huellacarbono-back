import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertTransporteResiduosIngresoDto {

    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsNotEmpty()
    @IsNumber()
    tipo_transporte_residuo_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    sed_transporte_residuos_id: number;
    
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
    @IsBoolean()
    flag_alto_contenido_aceite_grasa: boolean;
    
    @IsNotEmpty()
    @IsString()
    condiciones: string;
    
    @IsNotEmpty()
    @IsNumber()
    temperatura: number;
    
    @IsNotEmpty()
    @IsString()
    precipitacion: string;
    
    @IsNotEmpty()
    @IsNumber()
    crecimiento_anual: number;

    @IsOptional()
    @IsString()
    evidencia_url: string;
}