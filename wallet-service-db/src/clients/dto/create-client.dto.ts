// clients/dto/create-client.dto.ts
import { IsString, IsEmail, Length, IsNotEmpty, Matches } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty() @IsString() document: string;
  @IsNotEmpty() @IsString() @Length(10, 10) @Matches(/^\d{10}$/, { message: 'Cellphone must contain exactly 10 digits' }) cellphone: string;
  @IsNotEmpty() @IsString() name: string;
  @IsNotEmpty() @IsEmail() email: string;
}
