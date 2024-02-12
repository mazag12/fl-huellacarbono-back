import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertTransportePropioIngresoDto {
    
    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsNotEmpty()
    @IsNumber()
    tipo_transporte_propio_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    cantidad: number;

    @IsNotEmpty()
    @IsString()
    fecha_ingreso: string;
}