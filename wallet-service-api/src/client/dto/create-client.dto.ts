import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: '12345678', description: 'Documento del cliente' })
  document: string;

  @ApiProperty({ example: 'Juan Perez', description: 'Nombre completo' })
  name: string;

  @ApiProperty({ example: 'juan@mail.com', description: 'Correo electrónico' })
  email: string;

  @ApiProperty({ example: '3101234567', description: 'Celular' })
  cellphone: string;
}
