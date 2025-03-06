import { Injectable } from '@nestjs/common';

import { HandleRpcExceptions } from 'src/common/decorators';

import {
  CreateRoomStateRequest,
  FindOneRoomStateRequest,
} from 'src/grpc/proto/rooms/rooms_states.pb';

import { RoomsStatesRepository } from './repository/rooms-states.repository';

import { RoomState } from './entity/room-state.entity';

@Injectable()
export class RoomsStatesService {
  constructor(private readonly roomsStatesRepository: RoomsStatesRepository) {}

  @HandleRpcExceptions()
  save(request: CreateRoomStateRequest): void {
    this.roomsStatesRepository.save(request);
  }

  @HandleRpcExceptions()
  async findOne(request: FindOneRoomStateRequest): Promise<RoomState> {
    const { room_state_id } = request;

    return this.roomsStatesRepository.findOne(room_state_id);
  }
}
