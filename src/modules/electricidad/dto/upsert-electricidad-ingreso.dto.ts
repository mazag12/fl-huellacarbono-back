import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

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
    fecha_ingreso: string;
}