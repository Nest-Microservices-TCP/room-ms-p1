import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { QueryFailedError } from 'typeorm';

export function HandleGrpcExceptions() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        console.log('Pasa por el decorador gRPC');

        let code = status.INTERNAL;
        let message = `Error in ${propertyKey}: ${error.message || error}`;
        let metadata: Record<string, any> = {};

        if (error instanceof QueryFailedError) {
          code = status.INVALID_ARGUMENT;
          message = `Database error: ${error.message || error}`;
          metadata = {
            cause: 'QueryFailedError',
            detail: error.driverError?.detail || null,
          };
        }

        throw new RpcException({ code, message, metadata });
      }
    };

    return descriptor;
  };
}
