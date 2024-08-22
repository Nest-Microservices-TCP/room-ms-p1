import { Controller } from '@nestjs/common';
import { RoomsStatesService } from './rooms-state.service';
import { CreateRoomStateDto } from './dto/create-room-state.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class RoomsStatesController {
  constructor(private readonly roomsStatesService: RoomsStatesService) {}

  @MessagePattern({ cmd: 'save.room.state' })
  async save(@Payload() request: CreateRoomStateDto) {
    return this.roomsStatesService.save(request);
  }
}
