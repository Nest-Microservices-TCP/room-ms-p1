import { IBaseRepository } from 'src/common/interfaces';
import { RoomEntity } from 'src/rooms/entity/room.entity';
import { CreateRoomDto, UpdateRoomDto } from 'src/rooms/dto/request';

export interface IRoomsRepository
  extends IBaseRepository<RoomEntity, CreateRoomDto, UpdateRoomDto> {}
