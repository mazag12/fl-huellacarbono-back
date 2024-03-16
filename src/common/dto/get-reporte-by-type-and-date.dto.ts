import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TipoDate, TipoReporte } from "src/common/constants";
export class GetReporteByTypeAndDateDto {
    // @IsNotEmpty()
    // tipoReporte: TipoReporte;

    @IsNotEmpty()
    tipoDate: TipoDate;

    @IsNotEmpty()
    @IsString()
    valueDate: string;

    @IsOptional()
    @IsString()
    locacion?: string;

}

