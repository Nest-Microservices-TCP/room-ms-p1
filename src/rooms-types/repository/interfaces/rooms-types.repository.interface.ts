import { IRepository } from 'src/common/repository';
import { CreateRoomTypeRequest } from 'src/grpc/proto/rooms/rooms_types.pb';
import { RoomType } from 'src/rooms-types/entity/room-type.entity';

export interface IRoomsTypesRepository
  extends IRepository<RoomType, CreateRoomTypeRequest> {}
