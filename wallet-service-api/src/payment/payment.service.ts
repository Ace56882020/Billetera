import { Injectable } from '@nestjs/common';
import { handleRequest, httpClient } from 'src/shared/http-client';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { PaymentDto } from './dto/payment.dto';
import { MailService } from 'src/mailer/mailer.service';

@Injectable()
export class PaymentService {
constructor(private readonly mailService: MailService) {}

  async paymentSession(paymentDto: PaymentDto) {
    try {
      const res = await handleRequest(httpClient.post('/payment', paymentDto));
      await this.mailService.sendTokenEmail(res.data.email, res.data.token);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async confirmPayment(confirmPaymentDto:ConfirmPaymentDto) {
    try {
      const res = await handleRequest(
        httpClient.post('/payment/confirm', confirmPaymentDto),
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
}
