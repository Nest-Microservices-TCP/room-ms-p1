import { NotFoundException } from '@nestjs/common';
import { getCallerInfo } from 'src/common/utils';

export class EntityNotFoundException extends NotFoundException {
  constructor(entityName: string) {
    const { className, methodName } = getCallerInfo();

    const message = `The ${entityName} with provided ID does not exist`;

    super({ className, methodName, message });
  }
}
