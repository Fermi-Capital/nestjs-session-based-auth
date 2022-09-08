import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from '@app/accounts/accounts.service';
import { LocalStrategy } from './local.strategy';

@Controller('auth')
export class AccountAuthController {
  constructor(private readonly accountService: AccountService) {}

  //Post / Login
  @UseGuards(LocalStrategy)
  @Post('/login')
  login(@Body() accountData: { id: number }): any {
    return { accountId: accountData.id, msg: 'Account logged in' };
  }

  //Get / protected
  // @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): string {
    return req.body;
  }

  //Get / logout
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
