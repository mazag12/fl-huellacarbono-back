import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: 'sandbox.smtp.mailtrap.io',
          port: 468,
          secure: false,
          auth:{
            user: "6d09459e0b6099",
            pass: "29319a4dba82e7",
          },
        },
        defaults: { from: '"Notificaciones Footloose" <from@example.com>', }
      })
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
