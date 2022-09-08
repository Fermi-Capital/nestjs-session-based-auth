import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ClientService } from './clients.service';
import { Client } from '@prisma/client';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get(':clientId')
  async client(@Param('clientId') clientId: Client['id']): Promise<Client> {
    return this.clientService.client({ id: Number(clientId) });
  }

  @Post()
  async createClient(): Promise<Client> {
    return this.clientService.createClient();
  }

  @Patch(':clientId/freeze')
  async updateClient(
    @Param('clientId') clientId: string,
    @Body()
    updateClientData: { eventDescription: string },
  ): Promise<Client> {
    const { eventDescription } = updateClientData;
    return this.clientService.freezeClient({
      where: { id: Number(clientId) },
      eventDescription,
    });
  }
}
