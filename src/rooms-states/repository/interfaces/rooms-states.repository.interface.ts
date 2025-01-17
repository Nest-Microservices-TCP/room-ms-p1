import { IRepository } from 'src/common/repository';
import { CreateRoomStateDto } from 'src/rooms-states/dto/request';
import { RoomState } from 'src/rooms-states/entity/room-state.entity';

export interface IRoomsStateRepository
  extends IRepository<RoomState, CreateRoomStateDto> {}
