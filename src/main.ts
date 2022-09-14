import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // https request from ingenx or the like
  app.set('trust proxy', true);

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
      name: 'path:account:session',
      resave: false,
      cookie: {
        signed: false,
        secure: process.env.NODE_ENV === 'dev' ? false : true,
        maxAge: 0.1 * 60 * 60 * 1000, // 6 mins
      },
    }),
  );

  // swagger
  const config = new DocumentBuilder()
    .setTitle('B2B example')
    .setDescription('Path B2b API')
    .setVersion('1.0')
    .addTag('Path B2B')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
