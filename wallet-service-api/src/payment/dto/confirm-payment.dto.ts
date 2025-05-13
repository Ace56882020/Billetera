
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmPaymentDto {
  @ApiProperty({ example: '6822ae6e323ccff12', description: 'Session Id' })
  sessionId: string;

  @ApiProperty({ example: '849617', description: 'Token pago' })
  token: string;

}
