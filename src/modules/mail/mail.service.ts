import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
    ) {}

    async sendEmailExample() {
        return await this.mailerService.sendMail({
            to: 'marco.aycachi@footloose.pe, ray.pacuri@footloose.pe',
            subject: 'PRUEBA',
            text: 'Texto de Prueba',
        })
    }
}
