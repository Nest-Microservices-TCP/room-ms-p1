import { IRepository } from 'src/common/repository';
import { CreateRoomDto } from 'src/rooms/dto/request';
import { Room } from 'src/rooms/entity/room.entity';

export interface IRoomsRepository extends IRepository<Room, CreateRoomDto> {}
