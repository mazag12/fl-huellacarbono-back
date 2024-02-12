import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertTransporteCasaTrabajoIngresoDto {
    
    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsNotEmpty()
    @IsNumber()
    tipo_transporte_casa_trabajo_id: number;
    
    @IsNotEmpty()
    @IsString()
    descripcion_personal: string;
    
    @IsNotEmpty()
    @IsNumber()
    numero_trabajadores: number;
    
    @IsNotEmpty()
    @IsNumber()
    viajes_por_semana_promedio: number;
    
    @IsNotEmpty()
    @IsNumber()
    dias_laborales: number;
    
    @IsNotEmpty()
    @IsNumber()
    distancia_promedio: number;
    
    @IsNotEmpty()
    @IsString()
    fecha_ingreso: string;
}