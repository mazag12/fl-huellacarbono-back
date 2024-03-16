import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { sendEmail } from 'src/auth/interfaces/sendEmail';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
    ) {}

    async sendEmailExample(user: sendEmail) {
        return await this.mailerService.sendMail({
            to: user.email,
            subject: user.code + ' es el código de recuperación de tu cuenta de Huella de Carbono',
            template: 'template',
            context:{
                nombre: user.nombre,
                codigo: user.code,
            }
        })
    }
}
