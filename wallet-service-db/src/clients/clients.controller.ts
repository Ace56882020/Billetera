import { Body, Controller, Get, Post, Query, UseFilters, UseInterceptors } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { RechargeDto } from './dto/recharge.dto';
import { SuccessInterceptor } from 'src/common/filters/success.interceptor';
import { AllExceptionsFilter } from 'src/common/filters/http-exception.filter';

@UseInterceptors(SuccessInterceptor)
@UseFilters(AllExceptionsFilter)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('register')
  registerClient(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.registerClient(createClientDto);
  }

  @Post('recharge')
  rechargeBalance(@Body() rechargeWalletDto: RechargeDto) {
    return this.clientsService.rechargeBalance(rechargeWalletDto);
  }

  @Get('balance')
  async getBalance(@Query('document') document: string, @Query('cellphone') cellphone: string) {
    return this.clientsService.getBalance(document, cellphone);
  }
  

}
