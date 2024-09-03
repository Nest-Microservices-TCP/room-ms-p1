import { Controller } from '@nestjs/common';
import { RoomsStatesService } from './rooms-state.service';
import { CreateRoomStateDto } from './dto/create-room-state.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoomStateEntity } from './entities/room-state.entity';
import { FindOneRoomStateByIdDto } from './dto/find-one-room-state-by-id.dto';
import { UpdateRoomStateDto } from './dto';

@Controller()
export class RoomsStatesController {
  constructor(private readonly roomsStatesService: RoomsStatesService) {}

  @MessagePattern({ cmd: 'save.room.state' })
  async save(@Payload() request: CreateRoomStateDto): Promise<RoomStateEntity> {
    return this.roomsStatesService.save(request);
  }

  @MessagePattern({ cmd: 'find.one.room.state' })
  async findOneById(
    @Payload() request: FindOneRoomStateByIdDto,
  ): Promise<RoomStateEntity> {
    return this.roomsStatesService.findOneById(request);
  }

  @MessagePattern({ cmd: 'find.all.rooms.states' })
  async findAll(): Promise<RoomStateEntity[]> {
    return this.roomsStatesService.findAll();
  }

  update(request: UpdateRoomStateDto): Promise<RoomStateEntity> {
    return this.roomsStatesService.update(request);
  }
}
