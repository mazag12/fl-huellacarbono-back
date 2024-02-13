import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertConsumoSeinIngresoDto {

    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsNotEmpty()
    @IsNumber()
    consumo_sein_tipo_id: number;
    
    @IsNotEmpty()
    @IsString()
    suministro: string;
    
    @IsNotEmpty()
    @IsNumber()
    cantidad: number;
    
    @IsNotEmpty()
    @IsDateString()
    fecha_ingreso: string;

    @IsNotEmpty()
    @IsString()
    area: string;
}