import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmPaymentDto {
  @IsNotEmpty() @IsString()
  sessionId: string;

  @IsNotEmpty() @IsString()
  token: string;
}
