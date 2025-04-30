import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { mapStatusCodeToGrpcCode } from 'src/common/utils';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    console.log({ exception });

    const exceptionResponse = exception['response'] || {};

    const statusCode =
      exception['status'] || exceptionResponse['statusCode'] || 500;

    const message =
      exceptionResponse['message'] || exception.message || 'Unexpected error';

    const code = mapStatusCodeToGrpcCode(statusCode);

    // const response = {
    //   className: responseData['className'],
    //   methodName: responseData['methodName'],
    //   message: exception['message'],
    //   origin: stackList[1].trim(),
    // };

    const metadata: Record<string, any> = {
      cause: 'prueba de causa',
    };

    /**
     * La razón de usar throwError es que este devuelve un observable que emite
     * un error, que es lo que espera internamente el protocolo de microservicios
     */
    return throwError(
      () =>
        new RpcException({
          metadata,
          message,
          code,
        }),
    );
  }
}
