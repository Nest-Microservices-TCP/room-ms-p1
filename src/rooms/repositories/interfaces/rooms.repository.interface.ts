import { CreateRoomDto, UpdateRoomDto } from 'src/rooms/dto/request';
import { IBaseRepository } from 'src/common/interfaces';
import { Room } from 'src/rooms/entity/room.entity';

export interface IRoomsRepository
  extends IBaseRepository<Room, CreateRoomDto, UpdateRoomDto> {}
