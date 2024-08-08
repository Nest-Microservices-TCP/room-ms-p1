import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsService {
  create() {
    return 'Create a room';
  }

  findOne() {
    return 'get one room';
  }

  findAll() {
    return 'get all rooms';
  }

  update() {
    return 'update one room';
  }

  delete() {
    return 'delete one room';
  }
}
