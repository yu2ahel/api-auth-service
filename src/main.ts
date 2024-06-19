import { config } from 'dotenv';
import { version } from '../package.json';

config();
process.env.APP_VERSION = version;
import * as swaggerUi from 'swagger-ui-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Swagger_API_Auth_Service } from './Swagger_API_Auth_Service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Load Swagger JSON file
  // Serve Swagger UI at /api-docs route
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(Swagger_API_Auth_Service),
  );

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
