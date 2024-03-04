import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetIdByTypeFacturaTipo {

    @IsNotEmpty()
    @IsString()
    factura: string;

    @IsNotEmpty()
    @IsNumber()
    tipo_electricidad_id: number;
}
