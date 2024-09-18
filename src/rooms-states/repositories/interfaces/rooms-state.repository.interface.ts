import { IBaseRepository } from 'src/common/interfaces';
import {
  CreateRoomStateDto,
  UpdateRoomStateDto,
} from 'src/rooms-states/dto/request';
import { RoomStateEntity } from 'src/rooms-states/entities/room-state.entity';

export interface IRoomsStateRepository
  extends IBaseRepository<
    RoomStateEntity,
    CreateRoomStateDto,
    UpdateRoomStateDto
  > {}
