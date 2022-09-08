import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/services/prisma.service';
import { Account, Prisma } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async account(
    accountWhereUniqueInput: Prisma.AccountWhereUniqueInput,
    forceRiskScoreUpdate?: boolean,
  ): Promise<Account | null> {
    if (forceRiskScoreUpdate) {
      console.log('risk update forced');
    }
    return this.prisma.account.findUnique({
      where: accountWhereUniqueInput,
    });
  }

  async createAccount(clientId: number): Promise<Account> {
    console.log(clientId);
    return this.prisma.account.create({
      data: { clientId },
    });
  }

  async updateAccount(params: {
    where: Prisma.AccountWhereUniqueInput;
    riskScoreSelected: Account['riskScoreSelected'];
  }): Promise<Account> {
    const { where, riskScoreSelected } = params;
    return this.prisma.account.update({
      data: {
        riskScoreSelected,
      },
      where,
    });
  }
}
