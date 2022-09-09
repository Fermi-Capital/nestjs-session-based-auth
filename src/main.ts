import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // https request from ingenx or something
  app.set('trust proxy', true);
  console.log();
  // redis@v4
  const redisClient = createClient({
    url: process.env.REDIS_HOST,
    legacyMode: true,
  });
  redisClient.connect().catch(console.error);

  const RedisStore = createRedisStore(session);
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      name: 'stacked:account:session',
      resave: false,
      cookie: {
        signed: false,
        secure: false,
        // Cookie Options
        maxAge: 0.1 * 60 * 60 * 1000, // 6 mins
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
