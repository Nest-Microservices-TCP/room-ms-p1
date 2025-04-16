import { IBaseRepository } from 'src/common/repository';
import { CreateRoomStateRequest } from 'src/grpc/rooms/rooms_states.pb';
import { RoomState } from 'src/rooms-states/entity/room-state.entity';

export interface IRoomsStateRepository
  extends IBaseRepository<RoomState, CreateRoomStateRequest> {}
