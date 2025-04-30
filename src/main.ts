import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  HttpExceptionFilter,
  TypeORMExceptionsFilter,
} from './common/exceptions/filters';

import { join } from 'path';
import { envs } from './config';

import { ROOMS_ROOMS_PACKAGE_NAME } from './grpc/rooms/rooms.pb';
import { ROOMS_RATES_PACKAGE_NAME } from './grpc/rooms/rates.pb';
import { ROOMS_RENTS_PACKAGE_NAME } from './grpc/rooms/rents.pb';
import { ROOMS_EXTRAS_PACKAGE_NAME } from './grpc/rooms/extras.pb';
import { ROOMS_AMENITIES_PACKAGE_NAME } from './grpc/rooms/amenities.pb';
import { ROOMS_ROOMS_TYPES_PACKAGE_NAME } from './grpc/rooms/rooms_types.pb';
import { ROOMS_ROOMS_STATES_PACKAGE_NAME } from './grpc/rooms/rooms_states.pb';
import { ROOMS_RENTS_EXTRAS_PACKAGE_NAME } from './grpc/rooms/rents_extras.pb';

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
          ROOMS_RENTS_PACKAGE_NAME,
          ROOMS_EXTRAS_PACKAGE_NAME,
          ROOMS_AMENITIES_PACKAGE_NAME,
          ROOMS_ROOMS_TYPES_PACKAGE_NAME,
          ROOMS_ROOMS_STATES_PACKAGE_NAME,
          ROOMS_RENTS_EXTRAS_PACKAGE_NAME,
        ],
        protoPath: [
          join(__dirname, '../proto-files/rooms/rooms.proto'),
          join(__dirname, '../proto-files/rooms/rents.proto'),
          join(__dirname, '../proto-files/rooms/rates.proto'),
          join(__dirname, '../proto-files/rooms/extras.proto'),
          join(__dirname, '../proto-files/rooms/amenities.proto'),
          join(__dirname, '../proto-files/rooms/rooms_states.proto'),
          join(__dirname, '../proto-files/rooms/rents_extras.proto'),
          join(__dirname, '../proto-files/rooms/rooms_types.proto'),
        ],
        loader: {
          includeDirs: [join(__dirname, '../proto-files')],
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    },
  );

  grpcApp.useGlobalFilters(
    new HttpExceptionFilter(),
    new TypeORMExceptionsFilter(),
  );

  // Iniciar la comunicación con RabbitMQ
  const rmqApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${envs.rabbitMqUser}:${envs.rabbitMqPassword}@${envs.rabbitMqHost}:${envs.rabbitMqPort}`,
        ],
        queue: envs.rmqRentsQueue, // Nombre de la cola de mensajes
        queueOptions: {
          durable: true,
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
