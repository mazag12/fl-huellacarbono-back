import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
    ) {}

    async sendEmailExample() {
        return await this.mailerService.sendMail({
            to: 'to@example.com',
            //* Copia de carbon bcc: '',
            //* Copia cc: '',
            subject: 'PRUEBA    ',
            text: 'Texto de Prueba',
        })
    }
}
