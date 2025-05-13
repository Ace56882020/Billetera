import { IsString, IsNumber, Min } from 'class-validator';

export class RechargeDto {
  @IsString()
  document: string;

  @IsString()
  cellphone: string;

  @IsNumber()
  @Min(1)
  amount: number;
}
