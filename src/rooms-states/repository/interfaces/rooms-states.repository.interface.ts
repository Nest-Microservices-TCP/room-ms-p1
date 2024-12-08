import { RoomState } from 'src/rooms-states/entity/room-state.entity';
import { IBaseRepository } from 'src/common/interfaces';
import {
  UpdateRoomStateDto,
  CreateRoomStateDto,
} from 'src/rooms-states/dto/request';

export interface IRoomsStateRepository
  extends IBaseRepository<RoomState, CreateRoomStateDto, UpdateRoomStateDto> {}
