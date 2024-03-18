import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class PutAccesosDto {

    @IsNotEmpty()
    @IsNumber()
    acceso_id: number;
    
    @IsBoolean()
    flag_activo?: boolean = true;

}