import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    code: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    password: string;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido: string;

    @IsOptional()
    @IsString()
    @IsIn(['ADMIN', 'USER'])
    role: string = 'USER';
}
