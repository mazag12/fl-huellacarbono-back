import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertElectricidadIngresoDto {

    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsNotEmpty()
    @IsNumber()
    tipo_electricidad_id: number;
    
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
    @IsString()
    area: string;

    @IsOptional()
    @IsString()
    evidencia_url: string;
}