import { RpcException } from '@nestjs/microservices';
import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { throwError } from 'rxjs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    console.log({ exception });

    const exceptionResponse = exception['response'] || {};

    // const response = {
    //   className: responseData['className'],
    //   methodName: responseData['methodName'],
    //   message: exception['message'],
    //   origin: stackList[1].trim(),
    // };

    const metadata: Record<string, any> = {
      cause: '',
    };

    return throwError(
      () =>
        new RpcException({
          code: status.INTERNAL,
          message: exceptionResponse['message'],
        }),
    );
  }
}
