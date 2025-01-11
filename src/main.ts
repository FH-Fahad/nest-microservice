import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppConfig } from './configuration/app.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [AppConfig.rabbitMQUri],
        queue: `${AppConfig.env}_main_queue`,
        queueOptions: {
          durable: true,
        },
      },
    }
  );

  await app.listen();
  console.log(`Microservice started port ${AppConfig.port} with ${AppConfig.env} environment`);
}

bootstrap();
