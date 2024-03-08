import { IsNotEmpty, IsNumber } from "class-validator";

export class PostAccesoDto {
    
    @IsNotEmpty()
    @IsNumber()
    user_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    modulo_id: number;
}