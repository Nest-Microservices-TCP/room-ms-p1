import { IBaseRepository } from 'src/common/interfaces';
import { CreateRoomDto, UpdateRoomDto } from 'src/rooms/dto';
import { RoomEntity } from 'src/rooms/entities/room.entity';

export interface IRoomsRepository
  extends IBaseRepository<RoomEntity, CreateRoomDto, UpdateRoomDto> {}