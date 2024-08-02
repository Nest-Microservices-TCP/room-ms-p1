import { Controller } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  create() {
    return 'create a room';
  }

  findOne() {
    return 'find one room';
  }

  findAll() {
    return 'find all rooms';
  }

  update() {
    return 'update one room';
  }

  delete() {
    return 'delete one room';
  }
}
