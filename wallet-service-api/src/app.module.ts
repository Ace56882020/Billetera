import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { PaymentModule } from './payment/payment.module';
import { CustomMailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule, 
    ClientModule,
    PaymentModule,
    CustomMailerModule 
  ],
})
export class AppModule {}
