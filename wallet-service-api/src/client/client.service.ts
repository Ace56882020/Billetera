import { BadRequestException, Injectable } from '@nestjs/common';
import { handleRequest, httpClient } from 'src/shared/http-client';
import { CreateClientDto } from './dto/create-client.dto';
import { RechargeDto } from './dto/recharge.dto';
import { CheckBalanceDto } from './dto/check-balance.dto';

@Injectable()
export class ClientService {
  async createClient(createClientDto: CreateClientDto) {
    try {
      const res = await handleRequest(
        httpClient.post('/clients/register', createClientDto),
      );
      return res;
    } catch (error) {
      throw error;
    }
  }

  async rechargeBalance(rechargeDto: RechargeDto) {
    try {
      const res = await handleRequest(
        httpClient.post('/clients/recharge', rechargeDto),
      );
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getBalance(document: string, cellphone: string) {
    try {
      const res = await handleRequest(
        httpClient.get('/clients/balance', {
          params: {
            document,
            cellphone,
          },
        }),
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
}
