import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'user_queue',
        queueOptions: {
          durable: true,
        },
      },
    }
  );

  app.listen();
  console.log(`Microservice is running on: ${process.env.PORT || 3001}`);
}
bootstrap();
