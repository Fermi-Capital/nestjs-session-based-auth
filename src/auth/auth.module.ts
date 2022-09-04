import { ClientModule } from '@app/clients/clients.module';
import { ClientService } from '@app/clients/clients.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { PrismaService } from '@app/services/prisma.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [ClientModule, PassportModule.register({ session: true })],
  providers: [
    ClientService,
    AuthService,
    LocalStrategy,
    SessionSerializer,
    PrismaService,
  ],
})
export class AuthModule {}
