import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from '@app/clients/clients.service';
import { LocalAuthGuard } from './local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly clientService: ClientService) {}
  //   //post / signup
  //   @Post('/signup')
  //   async addUser(
  //     @Body('password') userPassword: string,
  //     @Body('username') userName: string,
  //   ) {
  //     const saltOrRounds = 10;
  //     const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
  //     const result = await this.usersService.insertUser(userName, hashedPassword);
  //     return {
  //       msg: 'User successfully registered',
  //       userId: result.id,
  //       userName: result.username,
  //     };
  //   }
  //Post / Login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() clientId: { id: number }): any {
    return { User: clientId.id, msg: 'User logged in' };
  }

  //Get / protected
  // @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): string {
    return req.id;
  }

  //Get / logout
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
