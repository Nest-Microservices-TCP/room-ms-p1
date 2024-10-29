import { RoomStateEntity } from 'src/rooms-states/entity/room-state.entity';
import { IBaseRepository } from 'src/common/interfaces';
import {
  CreateRoomStateDto,
  UpdateRoomStateDto,
} from 'src/rooms-states/dto/request';

export interface IRoomsStateRepository
  extends IBaseRepository<
    RoomStateEntity,
    CreateRoomStateDto,
    UpdateRoomStateDto
  > {}
