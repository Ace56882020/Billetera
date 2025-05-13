import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  paymentSession(@Body() paymentDto: PaymentDto) {
    return this.paymentService.paymentSession(paymentDto);
  }

  @Post('confirm')
  confirmPayment(@Body() confirmPaymentDto: ConfirmPaymentDto) {
    return this.paymentService.confirmPayment(confirmPaymentDto);
  }
}
