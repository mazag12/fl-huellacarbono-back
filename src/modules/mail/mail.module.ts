import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: process.env.MAIL_URI,
        defaults: { from: '"Notificaciones Footloose" <notificaciones@footloose.pe>', },
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter({
            eq: function (a, b) {
              var next = arguments[arguments.length - 1];
              return (a === b) ? next.fn(this) : next.inverse(this);
            },
            ne: function (a, b) {
              var next = arguments[arguments.length - 1];
              return (a !== b) ? next.fn(this) : next.inverse(this);
            },
            lt: function (a, b) {
              var next = arguments[arguments.length - 1];
              return (a < b) ? next.fn(this) : next.inverse(this);
            },
            gt: function (a, b) {
              var next = arguments[arguments.length - 1];
              return (a > b) ? next.fn(this) : next.inverse(this);
            },
            le: function (a, b) {
              var next = arguments[arguments.length - 1];
              return (a <= b) ? next.fn(this) : next.inverse(this);
            },
            ge: function (a, b) {
              var next = arguments[arguments.length - 1];
              return (a >= b) ? next.fn(this) : next.inverse(this);
            },
            hasSubStr: function (a, b) {
              var next = arguments[arguments.length - 1];
              var bLeng = b.length;
              var aSubs = a.substring(0, bLeng);
              return (aSubs === b) ? next.fn(this) : next.inverse(this);
            }
          }),
        },
      })
    }),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
