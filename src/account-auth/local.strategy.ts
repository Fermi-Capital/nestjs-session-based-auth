import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AccountAuthService } from './auth.service';
import { Account } from '@prisma/client';

@Injectable()
export class LocalStrategy {
  constructor(private readonly authService: AccountAuthService) {}
  async validate(accountId: Account['id']): Promise<any> {
    const user = await this.authService.validateUser(accountId);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
