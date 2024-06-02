import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from './config/config.interface';
import helmet from 'helmet';
import { winstonLoggerInstance } from 'winston.logger';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: winstonLoggerInstance }),
  });
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  //empty of development
  app.enableCors();
  const configService = app.get(ConfigService<Config>);
  const appConfig = configService.get('app');
  await app.listen(appConfig.port);
}
bootstrap();
