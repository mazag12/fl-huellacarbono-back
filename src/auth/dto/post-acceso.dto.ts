import { Type } from "class-transformer";
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
//TODO 
// export class PostAccesoDto {

//     @IsNotEmpty()
//     @Type(() => ListadoAccesosToPostDto)
//     accesos: ListadoAccesosToPostDto[];
// }

// export class ListadoAccesosToPostDto {
//     @IsOptional()
//     @IsNumber()
//     id?: number;

//     @IsNotEmpty()
//     @IsNumber()
//     user_id: number;
    
//     @IsNotEmpty()
//     @IsNumber()
//     modulo_id: number;
// }