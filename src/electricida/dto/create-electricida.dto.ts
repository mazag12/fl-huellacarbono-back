import { IsDateString, IsInt, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateElectricidaDto {

    @IsDateString()
    fecha: string;

    @IsString()
    factura: string;

    @IsNumber()
    tipocombustible: number;

    @IsInt()
    @IsPositive()
    cantidad: number;

    @IsString()
    evidencia?: string;

    @IsString()
    mes: string

}
