import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountAuthModule } from './account-auth/auth.module';
import { ClientModule } from './clients/clients.module';
import { AccountModule } from './accounts/accounts.module';
import { ValidateAccountJwtMiddleware } from './middlewares/validateAccountJwt';

@Module({
  imports: [
    AccountAuthModule,
    ClientModule,
    AccountModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateAccountJwtMiddleware).forRoutes('accounts');
  }
}
