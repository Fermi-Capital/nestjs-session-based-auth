import { AccountModule } from '@app/accounts/accounts.module';
import { AccountService } from '@app/accounts/accounts.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AccountAuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { PrismaService } from '@app/services/prisma.service';
import { AccountAuthController } from './auth.controller';

@Module({
  controllers: [AccountAuthController],
  imports: [AccountModule, PassportModule.register({ session: true })],
  providers: [
    AccountService,
    AccountAuthService,
    LocalStrategy,
    SessionSerializer,
    PrismaService,
  ],
})
export class AccountAuthModule {}
