import { Body, Controller, Post, UseFilters, UseInterceptors } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { SuccessInterceptor } from 'src/common/filters/success.interceptor';
import { AllExceptionsFilter } from 'src/common/filters/http-exception.filter';

@UseInterceptors(SuccessInterceptor)
@UseFilters(AllExceptionsFilter)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  startPayment(@Body() paymentDto: PaymentDto) {
    return this.paymentService.startPayment(paymentDto);
  }
  @Post('confirm')
  confirmPayment(@Body() confirmPaymentDto: ConfirmPaymentDto) {
    return this.paymentService.confirmPayment(confirmPaymentDto);
  }
  
}
