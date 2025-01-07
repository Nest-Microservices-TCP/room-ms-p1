import { IRepository } from 'src/common/repository';
import {
  CreateRoomTypeDto,
  UpdateRoomTypeDto,
} from 'src/rooms-types/dto/request';
import { RoomType } from 'src/rooms-types/entity/room-type.entity';

export interface IRoomsTypesRepository
  extends IRepository<RoomType, CreateRoomTypeDto, UpdateRoomTypeDto> {}
