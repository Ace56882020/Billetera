import { IsString } from 'class-validator';

export class CheckBalanceDto {
  @IsString()
  document: string;

  @IsString()
  cellphone: string;
}
