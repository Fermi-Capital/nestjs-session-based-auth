import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ClientService } from './clients.service';
import { Client, Prisma } from '@prisma/client';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async clients(
    @Query('externalClientId') externalClientId: Client['externalClientId'],
  ): Promise<Client[]> {
    return this.clientService.clients({
      where: {
        externalClientId,
      },
    });
  }

  @Get(':clientId')
  async client(@Param('clientId') clientId: Client['id']): Promise<Client> {
    return this.clientService.client({ id: Number(clientId) });
  }

  @Post()
  async createClient(
    @Body()
    clientData: {
      externalClientId: Prisma.ClientCreateInput['externalClientId'];
    },
  ): Promise<Client> {
    const { externalClientId } = clientData;
    return this.clientService.createClient(externalClientId);
  }

  @Patch(':clientId')
  async updateClient(
    @Param('clientId') clientId: string,
    @Body()
    clientData: { externalClientId: string },
  ): Promise<Client> {
    const { externalClientId } = clientData;
    return this.clientService.updateClient({
      where: { id: Number(clientId) },
      externalClientId,
    });
  }

  @Delete(':clientId')
  async deleteClient(@Param('clientId') clientId: string): Promise<Client> {
    return this.clientService.deleteClient({ id: Number(clientId) });
  }
}
