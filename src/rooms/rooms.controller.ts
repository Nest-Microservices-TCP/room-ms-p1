import { Controller } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  create() {}

  findOne() {}

  findAll() {}

  update() {}

  delete() {}
}
