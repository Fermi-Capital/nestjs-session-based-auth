import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountAuthService } from './auth.service';

@Controller('auth')
export class AccountAuthController {
  constructor(private readonly accountAuthService: AccountAuthService) {}

  @Post('/login')
  async login(@Body() accountData: { id: number }): Promise<any> {
    const account = await this.accountAuthService.validateAccount(
      accountData.id,
    );
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }

  //Get / protected
  // @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Session() session: Record<string, any>): any {
    console.log(session);
    return session;
  }

  @Get('/logout')
  logout(@Session() session: Record<string, any>): any {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    session = null;
    return { msg: 'The account session has ended' };
  }
}
