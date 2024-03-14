import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class PostAccesoDto {
    
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    modulo_id: number;
}