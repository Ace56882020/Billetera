import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from 'src/clients/entities/client.entity';
import { Payment } from './entities/payment.entity';
import { PaymentDto } from './dto/payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(Client.name) private clientModel: Model<Client>, // Inyectamos Cliente también
  ) {}

  async startPayment(dto: PaymentDto) {
    // Validar cliente y saldo
    const client = await this.clientModel.findOne({
      document: dto.document,
      cellphone: dto.cellphone,
    });
    if (!client) {
      throw new BadRequestException('Cliente no encontrado');
    }
    if (client.balance < dto.amount) {
      throw new BadRequestException('Saldo insuficiente');
      // return { code: 1, message: 'Saldo insuficiente' };
    }
    // Generar token de 6 dígitos
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    // Crear sesión de pago
    const pagoSession = new this.paymentModel({
      document: dto.document,
      cellphone: dto.cellphone,
      amount: dto.amount,
      token,
      valid: true,
    });
    const session = await pagoSession.save();
    // Simular envío de token por correo (console.log)
    console.log(`Enviando token de pago (${token}) al cliente ${client.email}`);
    return {
      statusCode: 200,
      message: 'Token generado',
      data: { sessionId: session._id, email: client.email, token },
    };
  }

  async confirmPayment(dto: ConfirmPaymentDto) {
    const session = await this.paymentModel.findById(dto.sessionId);
    if (!session) {
      throw new BadRequestException('Sesión no encontrada');
      // return { code: 1, message: 'Sesión no encontrada' };
    }
    if (!session.valid) {
      throw new BadRequestException('Token inválido o ya usado');
      // return { code: 1, message: 'Token inválido o ya usado' };
    }
    if (session.token !== dto.token) {
      throw new BadRequestException('Token incorrecto');
      // return { code: 1, message: 'Token incorrecto' };
    }
    // Validar cliente y descontar saldo
    const client = await this.clientModel.findOne({
      document: session.document,
      cellphone: session.cellphone,
    });
    if (!client) {
      throw new BadRequestException('Cliente no encontrado');
    }
    if (client.balance < session.amount) {
      throw new BadRequestException('Saldo insuficiente');
    }
    client.balance -= session.amount;
    await client.save();
    // Invalidar token
    session.valid = false;
    await session.save();
    return { statusCode: 200, message: 'Pago confirmado' };
  }
}
