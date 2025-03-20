import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

import { envs } from './config';

import { ROOMS_ROOMS_PACKAGE_NAME } from './grpc/proto/rooms/rooms.pb';
import { ROOMS_RATES_PACKAGE_NAME } from './grpc/proto/rooms/rates.pb';
import { ROOMS_EXTRAS_PACKAGE_NAME } from './grpc/proto/rooms/extras.pb';
import { ROOMS_AMENITIES_PACKAGE_NAME } from './grpc/proto/rooms/amenities.pb';
import { ROOMS_ROOMS_STATES_PACKAGE_NAME } from './grpc/proto/rooms/rooms_states.pb';

async function bootstrap() {
  const logger = new Logger('Rooms-MS');

  // Iniciar la comunicación con gRPC
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${envs.host}:${envs.port}`,
        package: [
          ROOMS_ROOMS_PACKAGE_NAME,
          ROOMS_RATES_PACKAGE_NAME,
          ROOMS_EXTRAS_PACKAGE_NAME,
          ROOMS_AMENITIES_PACKAGE_NAME,
          ROOMS_ROOMS_STATES_PACKAGE_NAME,
        ],
        protoPath: [
          './proto/rooms/rooms.proto',
          './proto/rooms/rates.proto',
          './proto/rooms/extras.proto',
          './proto/rooms/amenities.proto',
          './proto/rooms/rooms_states.proto',
        ],
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    },
  );

  const rmqApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${envs.rabbitMqHost}:${envs.rabbitMqPort}`], // URL de RabbitMQ
        queue: 'rents-events-queue', // Nombre de la cola de mensajes
        queueOptions: {
          durable: true, // Si la cola deber ser durable (opcional)
        },
      },
    },
  );

  await grpcApp.listen();
  logger.log(
    `Rooms Microservice running with gRPC on ${envs.host}:${envs.port}`,
  );

  await rmqApp.listen();
  logger.log(
    `Rooms Microservice connected to RabbitMQ on ${envs.rabbitMqHost}:${envs.rabbitMqPort}`,
  );
}
bootstrap();
