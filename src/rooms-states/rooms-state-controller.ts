import { Controller } from '@nestjs/common';
import { RoomsStatesService } from './rooms-state.service';
import { CreateRoomStateDto } from './dto/create-room-state.dto';
import { RoomStateEntity } from './entities/room-state.entity';

@Controller()
export class RoomsStatesController {
  constructor(private readonly roomsStatesService: RoomsStatesService) {}

  async save(request: CreateRoomStateDto): Promise<RoomStateEntity> {
    return this.roomsStatesService.save(request);
  }
}
