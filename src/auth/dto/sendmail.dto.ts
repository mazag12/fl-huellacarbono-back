import { IsNotEmpty, IsString, Length } from 'class-validator';
export class SendMail {
    
    @IsNotEmpty()
    @IsString()
    @Length(8, 8)
    code: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    nombre: string;
}