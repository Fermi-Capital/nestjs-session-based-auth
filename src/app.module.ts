import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountAuthModule } from './account-auth/auth.module';
import { ClientModule } from './clients/clients.module';
import { AccountModule } from './accounts/accounts.module';
import { ConfigModule } from '@nestjs/config';
import { PartnerAuthService } from './partner-auth/auth.service';

@Module({
  imports: [
    AccountAuthModule,
    ClientModule,
    AccountModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, PartnerAuthService],
})
export class AppModule {}
