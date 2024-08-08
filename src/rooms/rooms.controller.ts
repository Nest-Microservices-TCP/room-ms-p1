import { Controller } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  create() {
    return this.roomsService.create();
  }

  findOne() {
    return this.roomsService.findOne();
  }

  findAll() {
    return this.roomsService.findAll();
  }

  update() {
    return this.roomsService.update();
  }

  delete() {
    return this.roomsService.delete();
  }
}
