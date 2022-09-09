import {
  Injectable,
  NotAcceptableException,
  Scope,
  Inject,
} from '@nestjs/common';
import { AccountService } from 'src/accounts/accounts.service';
import * as jwt from 'jsonwebtoken';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Account } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class AccountAuthService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly accountService: AccountService,
  ) {}
  async validateUser(accountId: Account['id']): Promise<any> {
    const accountData = await this.accountService.account({
      id: Number(accountId),
    });

    if (!accountData) {
      throw new NotAcceptableException('could not find the account');
    }

    // create account jwt
    const accountJwt = jwt.sign(
      {
        accountId: accountData.id,
        clientId: accountData.clientId,
      },
      'SetStrongSecretInDotEnv',
    );

    this.request.session = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jwt: accountJwt,
    };

    return accountData;
  }
}
