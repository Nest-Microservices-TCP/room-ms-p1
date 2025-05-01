import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { CustomExceptionDetails } from '../interfaces';
import { mapStatusCodeToGrpcCode } from 'src/common/utils';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException) {
    console.log({ exception });

    const exceptionResponse = exception['response'] || {};

    const statusCode =
      exception['status'] || exceptionResponse['statusCode'] || 500;

    const exception_message =
      exceptionResponse['message'] || exception.message || 'Unexpected error';

    const response: CustomExceptionDetails = {
      exception_message,
      metadata: {
        className: exceptionResponse['className'],
        methodName: exceptionResponse['methodName'],
      },
    };

    this.logger.error(`HttpException: ${exception_message}`);

    const code = mapStatusCodeToGrpcCode(statusCode);
    const message = JSON.stringify(response);

    /**
     * La razón de usar throwError es que este devuelve un observable que emite
     * un error, que es lo que espera internamente el protocolo de microservicios
     */
    return throwError(() => new RpcException({ message, code }));
  }
}
