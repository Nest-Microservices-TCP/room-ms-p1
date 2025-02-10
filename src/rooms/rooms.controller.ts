import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { RoomResponseDto } from './dto/response';

import { RoomsService } from './rooms.service';

@Controller()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @MessagePattern('rooms.find.one.room')
  findOne(@Payload('roomId') roomId: string): Promise<RoomResponseDto> {
    return this.roomsService.findOne(roomId);
  }
}
