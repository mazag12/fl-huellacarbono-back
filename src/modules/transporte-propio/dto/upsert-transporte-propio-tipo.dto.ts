import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertTransportePropioTipoDto {
    
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
    factor: number;
    
    @IsNotEmpty()
    @IsNumber()
    valor_neto: number;
    
    @IsNotEmpty()
    @IsNumber()
    co2: number;
    
    @IsNotEmpty()
    @IsNumber()
    ch4: number;
    
    @IsNotEmpty()
    @IsNumber()
    n2o: number;
}