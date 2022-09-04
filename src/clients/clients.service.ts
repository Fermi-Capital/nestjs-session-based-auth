import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/services/prisma.service';
import { Client, Prisma } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async client(
    userWhereUniqueInput: Prisma.ClientWhereUniqueInput,
  ): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async clients(params: {
    where?: { externalClientId: Client['externalClientId'] };
  }): Promise<Client[]> {
    const { where } = params;
    return this.prisma.client.findMany({
      where,
    });
  }

  async createClient(
    externalClientId: Prisma.ClientCreateInput['externalClientId'],
  ): Promise<Client> {
    return this.prisma.client.create({
      data: {
        externalClientId,
      },
    });
  }

  async updateClient(params: {
    where: Prisma.ClientWhereUniqueInput;
    externalClientId: Client['externalClientId'];
  }): Promise<Client> {
    const { where, externalClientId } = params;
    return this.prisma.client.update({
      data: {
        externalClientId,
      },
      where,
    });
  }

  async deleteClient(where: Prisma.ClientWhereUniqueInput): Promise<Client> {
    return this.prisma.client.delete({
      where,
    });
  }
}
