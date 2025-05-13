// schemas/client.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Client extends Document {
  @Prop({ required: true, unique: true })
  document: string;

  @Prop({ required: true })
  cellphone: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true ,unique: true })
  email: string;

  @Prop({ default: 0 })
  balance: number;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
