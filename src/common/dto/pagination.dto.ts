import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export default class PaginationDto {

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    readonly limit?: number = 5;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly page?: number = 1;

    @IsOptional()
    @Transform(v => v?.value?.split(','))
    readonly order?: string;

    @IsOptional()
    @Transform(({ value }) => JSON.parse(value ?? '{}'))
    readonly filter?: string;

    @Expose()
    get offset(): number {
        return this.limit * (this.page - 1);
    }

    /* SEQUELIZE */

    @IsOptional()
    // @Transform(v => v?.value?.split(','))
    key?: string;

    @IsOptional()
    // @IsIn(['adjacent', 'all', 'and', 'any', 'between', 'col', 'contained', 'contains', 'endsWith', 'eq', 'gt', 'gte', 'iLike', 'in', 'iRegexp', 'is', 'like', 'lt', 'lte', 'match', 'ne', 'noExtendLeft', 'noExtendRight', 'not', 'notBetween', 'notILike', 'notIn', 'notIRegexp', 'notLike', 'notRegexp', 'or', 'overlap', 'placeholder', 'regexp', 'startsWith', 'strictLeft', 'strictRight', 'substring', 'values'])
    // @Transform(v => v?.value?.split(','))
    operator?: string;

    @IsOptional()
    // @Transform(({ value }) => JSON.parse(value ?? '{}'))
    value?: string;

    @IsOptional()
    factura?: string = '';

    @IsOptional()
    tipo?: number = 0;

    @IsOptional()
    fecha?: string = '';

    @IsOptional()
    unidad?: string = '';

}
