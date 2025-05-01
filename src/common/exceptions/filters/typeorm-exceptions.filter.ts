import { throwError } from 'rxjs';
import { status } from '@grpc/grpc-js';
import { QueryFailedError } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { CustomExceptionDetails } from '../interfaces';

@Catch(QueryFailedError)
export class TypeORMExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(TypeORMExceptionsFilter.name);

  catch(exception: QueryFailedError) {
    const details: CustomExceptionDetails = {
      details: exception?.message || 'Unexpected error',
      cause: 'Esta es la causa',
      metadata: { service: 'Un servicio' },
    };

    const code = status.INTERNAL;
    const message = JSON.stringify(details);

    this.logger.error(`TypeORMException: ${exception.message}`);

    return throwError(
      () =>
        new RpcException({
          message,
          code,
        }),
    );
  }
}
