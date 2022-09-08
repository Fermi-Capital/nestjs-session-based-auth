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

  async createClient(): Promise<Client> {
    return this.prisma.client.create({ data: {} });
  }

  async freezeClient(params: {
    where: Prisma.ClientWhereUniqueInput;
    eventDescription: string;
  }): Promise<Client> {
    const { where, eventDescription } = params;

    // does the freeze event have an event description
    if (eventDescription) {
      console.log(eventDescription);
    } else {
      console.log('No event description');
    }

    return this.prisma.client.update({
      data: {
        isFrozen: true,
      },
      where,
    });
  }
}
