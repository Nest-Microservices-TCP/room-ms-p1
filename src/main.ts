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

  // Iniciar el microservicio con TCP
  // const tcpApp = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.TCP,
  //     options: {
  //       host: envs.host,
  //       port: envs.port,
  //     },
  //   },
  // );

  // tcpApp.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );

  // Iniciar la comunicación con gRPC
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${envs.host}:${envs.port}`,
        package: [
          ROOMS_RATES_PACKAGE_NAME,
          ROOMS_ROOMS_PACKAGE_NAME,
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
      },
    },
  );

  /**
   * Configuración para comunicación a traves de Apache Kafka
   * En este caso esta es la configuración como producer (productor de mensajes)
   */
  // Iniciar el microservicio con Kafka
  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          /**
           * @clientId
           * Un identificador único para este microservicio
           */
          clientId: envs.kafkaClientId,
          /**
           * @brokers
           * Aquí se definen las direcciones de los servidores Kafka. En
           * este ejemplo, se esta usando kafka:9093, que es el broker
           * Kafka expuesto a traves de Docker
           */
          brokers: [envs.kafkaBroker],
        },
        consumer: {
          /**
           * @groupId
           * Kafka organiza los consumidores en grupos. Los mensajes se
           * distribuyen entre los consumidores del mismo grupo
           */
          groupId: envs.kafkaGroupId,
          allowAutoTopicCreation: true,
        },
      },
    },
  );

  // await tcpApp.listen();
  // logger.log(`Rooms Microservice listen on port ${envs.port}`);

  await grpcApp.listen();
  logger.log(
    `Rooms Microservice running with gRPC on ${envs.host}:${envs.port}`,
  );

  await kafkaApp.listen();
  logger.log(`Rooms Microservice connected to Kafka`);
}
bootstrap();
