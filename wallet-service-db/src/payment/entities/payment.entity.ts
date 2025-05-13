
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Payment extends Document {
  @Prop({ required: true })
  document: string;

  @Prop({ required: true })
  cellphone: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  token: string;

  @Prop({ default: true })
  valid: boolean;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);