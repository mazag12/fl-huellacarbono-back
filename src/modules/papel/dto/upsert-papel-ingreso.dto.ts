import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertPapelIngresoDto {
    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsNotEmpty()
    @IsNumber()
    tipo_papel_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    cantidad: number;
    
    @IsNotEmpty()
    @IsDateString()
    fecha_ingreso: string;
    
    @IsNotEmpty()
    @IsNumber()
    reciclado: number;
    
    @IsNotEmpty()
    @IsString()
    nombre_certificado: string;

    @IsNotEmpty()
    @IsNumber()
    densidad: number;

    @IsNotEmpty()
    @IsString()
    area: string;
}