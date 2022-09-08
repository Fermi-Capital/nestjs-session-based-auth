import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // redis@v4
  const redisClient = createClient({
    url: 'redis://127.0.0.1:6379',
    legacyMode: true,
  });
  redisClient.connect().catch(console.error);

  // global config jwt cookie combo auth
  app.use(
    '/sldkfj',
    passport.authenticate('jwt-cookiecombo', {
      session: false,
      jwt: {
        secret: process.env.JWT_SECRET || 'SetStrongSecretInDotEnv',
        options: {
          audience: 'https://example.io',
          expiresIn: '1h',
          issuer: 'example.io',
        },
        cookie: {
          httpOnly: true,
          sameSite: true,
          signed: true,
          secure: true,
        },
      },
    }),
    (req, res, next) => {
      return next();
    },
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
