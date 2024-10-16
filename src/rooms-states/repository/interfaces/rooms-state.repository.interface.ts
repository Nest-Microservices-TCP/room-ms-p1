import {
  CreateRoomStateDto,
  UpdateRoomStateDto,
} from 'src/rooms-states/dto/request';
import { IBaseRepository } from 'src/common/interfaces';
import { RoomStateEntity } from 'src/rooms-states/entity/room-state.entity';

export interface IRoomsStateRepository
  extends IBaseRepository<
    RoomStateEntity,
    CreateRoomStateDto,
    UpdateRoomStateDto
  > {}
