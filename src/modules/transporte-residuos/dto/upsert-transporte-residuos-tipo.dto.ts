import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertTransporteResiduosTipoDto {
    
    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsNotEmpty()
    @IsString()
    nombre: string;
    
    @IsNotEmpty()
    @IsString()
    unidad: string;
    
    @IsNotEmpty()
    @IsNumber()
    doc: number;
    
    @IsNotEmpty()
    @IsNumber()
    gwp: number;
}