import { InternalServerErrorException } from '@nestjs/common';
import { getCallerInfo } from 'src/common/utils';

export class FailedRestoreException extends InternalServerErrorException {
  constructor(entityName: string) {
    const { className, methodName } = getCallerInfo();

    const message = `Error to restore the ${entityName}, try again`;

    super({ className, methodName, message });
  }
}
