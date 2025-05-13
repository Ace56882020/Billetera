import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Solicitar token de pago' })
  @ApiResponse({ status: 201, description: 'Token de pago con éxito' })
  paymentSession(@Body() paymentDto: PaymentDto) {
    return this.paymentService.paymentSession(paymentDto);
  }

  @Post('confirm')
  @ApiOperation({ summary: 'Aprobacion de pago' })
  @ApiResponse({ status: 201, description: 'Pago aprobado con éxito' })
  confirmPayment(@Body() confirmPaymentDto: ConfirmPaymentDto) {
    return this.paymentService.confirmPayment(confirmPaymentDto);
  }
}
