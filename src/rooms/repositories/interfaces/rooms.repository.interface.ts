import { IBaseRepository } from 'src/common/repository';
import { CreateRoomRequest } from 'src/grpc/rooms/rooms.pb';
import { Room } from 'src/rooms/entity/room.entity';

export interface IRoomsRepository
  extends IBaseRepository<Room, CreateRoomRequest> {}
