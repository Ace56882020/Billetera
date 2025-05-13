import { ApiProperty } from '@nestjs/swagger';

export class CheckBalanceDto {
  @ApiProperty({ example: '12345678', description: 'Documento del cliente' })
  document: string;

  @ApiProperty({ example: '3101234567', description: 'Celular' })
  cellphone: string;
}
