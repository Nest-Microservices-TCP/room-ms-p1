import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Rooms-MS');

  // Iniciar el microservicio con TCP
  const tcpApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: envs.host,
        port: envs.port,
      },
    },
  );

  tcpApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
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

  await tcpApp.listen();
  logger.log(`Rooms Microservice listen on port ${envs.port}`);

  await kafkaApp.listen();
  logger.log(`Rooms Microservice connected to Kafka`);
}
bootstrap();
