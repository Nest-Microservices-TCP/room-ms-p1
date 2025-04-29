import { QueryFailedError } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { Catch, ExceptionFilter } from '@nestjs/common';

@Catch(QueryFailedError)
export class TypeORMExceptionsFilter implements ExceptionFilter {
  catch() {
    throw new RpcException({
      message: 'Database error',
      status: 500,
    });
  }
}
