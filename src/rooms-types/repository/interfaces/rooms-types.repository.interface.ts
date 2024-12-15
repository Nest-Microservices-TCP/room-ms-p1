import { RoomType } from 'src/rooms-types/entity/room-type.entity';
import { IBaseRepository } from 'src/common/interfaces';
import {
  CreateRoomTypeDto,
  UpdateRoomTypeDto,
} from 'src/rooms-types/dto/request';

export interface IRoomsTypesRepository
  extends IBaseRepository<RoomType, CreateRoomTypeDto, UpdateRoomTypeDto> {}
