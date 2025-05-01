import { InternalServerErrorException } from '@nestjs/common';
import { getCallerInfo } from 'src/common/utils';

export class FailedSoftDeleteException extends InternalServerErrorException {
  constructor(entityName: string) {
    const { className, methodName } = getCallerInfo();

    const message = `Error to soft delete the ${entityName}, try again`;

    super({ className, methodName, message });
  }
}
