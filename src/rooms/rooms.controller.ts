import { Controller } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoomStateDto } from 'src/rooms-states/dto/create-room-state.dto';

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

  @MessagePattern({ cmd: 'get.hello' })
  getHello(@Payload() request: CreateRoomStateDto) {
    console.log('payload->', { request });
    return 'Hola desde el microservicio';
  }
}
