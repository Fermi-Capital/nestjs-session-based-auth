import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';
// @ts-ignore
import * as cookieSession from 'cookie-session';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // https request from ingenx or something
  app.set('trust proxy', true);

  // redis@v4
  const redisClient = createClient({
    url: 'redis://127.0.0.1:6379',
    legacyMode: true,
  });
  redisClient.connect().catch(console.error);

  app.use(
    cookieSession({
      name: 'stacked:account:session',
      signed: false,
      secure: false,
      // Cookie Options
      maxAge: 0.1 * 60 * 60 * 1000, // 6 mins
    }),
  );

  const RedisStore = createRedisStore(session);
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: 'keyboard cat',
      resave: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
