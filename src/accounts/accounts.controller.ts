import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  Session,
} from '@nestjs/common';
import { AccountService } from './accounts.service';
import { Account } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':accountId')
  async client(
    @Session() session: Record<string, any>,
    @Param('accountId') accountId: Account['id'],
    @Query('forceRiskScoreUpdate') forceRiskScoreUpdate: boolean,
  ): Promise<Account> {
    // @ts-ignore
    console.log(session);
    console.log(jwt.verify(session.jwt, 'SetStrongSecInDotEnv'));
    return this.accountService.account(
      { id: Number(accountId) },
      forceRiskScoreUpdate,
    );
  }

  @Post()
  async createAccount(
    @Body()
    createAccountData: {
      clientId: number;
    },
  ): Promise<Account> {
    const { clientId } = createAccountData;
    return this.accountService.createAccount(clientId);
  }

  @Patch(':accountId')
  async updateAccount(
    @Param('accountId') accountId: string,
    @Body()
    updateAccountData: { riskScoreSelected: number },
  ): Promise<Account> {
    const { riskScoreSelected } = updateAccountData;
    return this.accountService.updateAccount({
      where: { id: Number(accountId) },
      riskScoreSelected,
    });
  }
}
