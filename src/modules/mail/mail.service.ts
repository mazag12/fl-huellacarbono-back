import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
    ) {}

    async sendEmailExample() {
        return await this.mailerService.sendMail({
            to: 'email@footloose.pe',
            //* Copia de carbon bcc: '',
            //* Copia cc: '',
            subject: 'Subject del correo',
            text: 'Texto del correo',
        })
    }
}
