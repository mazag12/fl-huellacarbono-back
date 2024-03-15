import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Length, IsBoolean } from 'class-validator';
export class CreateUsuarioDto {

    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    code: string;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsString()
    @IsOptional()
    @IsStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    password?: string;

    @IsNotEmpty()
    @IsString()
    apellido: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsBoolean()
    isActive?: boolean = true;

    @IsOptional()
    @IsString()
    @IsIn(['ADMIN', 'USER', 'SUPERVISOR'])
    role?: string = 'USER';
}
