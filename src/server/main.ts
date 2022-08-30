import { showRoutes, isDevelopment } from './lib/global';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { join } from 'path';
import { AppModule } from './app.module';

const { SESSION_SECRET, PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // Auto Validation
  app.enableCors();
  app.use(
    session({
      secret: SESSION_SECRET || 'pos-app', // Not that important
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', '..', '..', 'assets'), {
    prefix: '/assets/',
  });

  await app.listen(PORT, async () => {
    console.log(`Server started at: http://localhost:${PORT}`);

    if (isDevelopment()) {
      showRoutes(app);
    }
  });
}

bootstrap();
