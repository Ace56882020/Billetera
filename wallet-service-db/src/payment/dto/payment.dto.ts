import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty() @IsString()
  document: string;

  @IsNotEmpty() @IsString()
  cellphone: string;

  @IsNotEmpty() @IsNumber()
  amount: number;
}
