import { AccountModule } from '@app/accounts/accounts.module';
import { AccountService } from '@app/accounts/accounts.service';
import { Module } from '@nestjs/common';
import { AccountAuthService } from './auth.service';
import { PrismaService } from '@app/services/prisma.service';
import { AccountAuthController } from './auth.controller';

@Module({
  controllers: [AccountAuthController],
  imports: [AccountModule],
  providers: [AccountService, AccountAuthService, PrismaService],
})
export class AccountAuthModule {}
