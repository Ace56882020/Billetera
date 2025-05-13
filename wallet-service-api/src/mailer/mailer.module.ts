import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailService } from './mailer.service';

@Module({
    imports: [
    MailerModule.forRootAsync({
      useFactory: async () => {
        const testAccount = await nodemailer.createTestAccount();
        return {
          transport: {
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
              user: "earlene.crona33@ethereal.email",
              pass: "9CpxCaFCHa11VsrCQ2",
            },
          },
          defaults: {
            from: `"Billetera App" <${"earlene.crona33@ethereal.email"}>`,
          },
          
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class CustomMailerModule  {}
