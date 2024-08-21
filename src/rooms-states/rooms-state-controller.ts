import { Controller } from '@nestjs/common';
import { RoomsStatesService } from './rooms-state.service';
import { CreateRoomStateDto } from './dto/create-room-state.dto';
import { RoomStateEntity } from './entities/room-state.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class RoomsStatesController {
  constructor(private readonly roomsStatesService: RoomsStatesService) {}

  @MessagePattern({ cmd: 'save_room_state' })
  async save(@Payload() request: CreateRoomStateDto): Promise<RoomStateEntity> {
    return this.roomsStatesService.save(request);
  }
}
