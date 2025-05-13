import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import { ClientService } from './client.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto';
import { AllExceptionsFilter } from 'src/common/http-exception.filter';
import { RechargeDto } from './dto/recharge.dto';

@ApiTags('clients')
@UseFilters(AllExceptionsFilter)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar cliente' })
  @ApiResponse({ status: 201, description: 'Cliente registrado con éxito' })
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  @Post('recharge')
  @ApiOperation({ summary: 'Recargar billetera' })
  @ApiResponse({ status: 200, description: 'Recarga con éxito' })
  rechargeBalance(@Body() rechargeDto:RechargeDto) {
    return this.clientService.rechargeBalance(rechargeDto);
  }

  @Get('balance')
  @ApiOperation({ summary: 'Consultar Saldo' })
  @ApiResponse({ status: 200, description: 'Consulta de saldo con éxito' })
  getBalance(@Query('document') document: string, @Query('cellphone') cellphone: string) {
    return this.clientService.getBalance(document,cellphone);
  }
}
