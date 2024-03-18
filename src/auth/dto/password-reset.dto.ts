import { IsNumber, IsString, IsStrongPassword } from "class-validator";

export class PasswordReset{
    @IsNumber()
    id: number;

    @IsString()
    @IsStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    password: string;

}