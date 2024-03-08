import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: process.env.MAIL_URI,
        defaults: { from: '"Notificaciones Footloose" <notificaciones@footloose.pe>', }
      })
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
