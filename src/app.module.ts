import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountAuthModule } from './account-auth/auth.module';
import { ClientModule } from './clients/clients.module';
import { AccountModule } from './accounts/accounts.module';

@Module({
  imports: [AccountAuthModule, ClientModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
