import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { RechargeDto } from './dto/recharge.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  async registerClient(dto: CreateClientDto) {
    try {
      const exists = await this.clientModel.findOne({
        documento: dto.document,
      });
      if (exists) {
        throw new BadRequestException('Cliente ya registrado');
      }
      const cliente = new this.clientModel({ ...dto, balance: 0 });
      const data = await cliente.save();
      return { statusCode: 201, message: 'Cliente registrado', data };
    } catch (error) {
      throw error;
    }
  }

  async rechargeBalance(dto: RechargeDto) {
    const client = await this.clientModel.findOne({
      document: dto.document,
      cellphone: dto.cellphone,
    });
    if (!client) {
      throw new BadRequestException('Cliente no encontrado');
    }
    client.balance += dto.amount;
    await client.save();
    return {
      statusCode: 200,
      message: 'Recarga exitosa',
      data: { balance: client.balance },
    };
  }

  async getBalance(document: string, cellphone: string) {
    try {
      const client = await this.clientModel.findOne({ document, cellphone });
      if (!client) {
        throw new BadRequestException('Cliente no encontrado');
      }
      return {
        code: 200,
        message: 'Consulta exitosa',
        data: { balance: client.balance },
      };
    } catch (error) {
         throw error;
    }
  }
}
