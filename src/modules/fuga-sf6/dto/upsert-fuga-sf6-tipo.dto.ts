import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertFugaSf6TipoDto {
    
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;
    
    @IsNotEmpty()
    @IsNumber()
    co2: number;
}