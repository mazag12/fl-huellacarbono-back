import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertModuloDto {

    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;
    
    @IsOptional()
    @IsString()
    url: string;
    
    @IsOptional()
    @IsString()
    icono: string;
}