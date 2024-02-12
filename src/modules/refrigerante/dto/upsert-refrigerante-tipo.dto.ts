import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertRefrigeranteTipoDto {
    
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;
}