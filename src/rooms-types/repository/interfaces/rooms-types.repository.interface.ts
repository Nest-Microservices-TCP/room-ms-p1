import { IBaseRepository } from 'src/common/repository';
import { CreateRoomTypeRequest } from 'src/grpc/rooms/rooms_types.pb';
import { RoomType } from 'src/rooms-types/entity/room-type.entity';

export interface IRoomsTypesRepository
  extends IBaseRepository<RoomType, CreateRoomTypeRequest> {}
