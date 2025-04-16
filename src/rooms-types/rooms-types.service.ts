import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import {
  CreateRoomTypeRequest,
  FindOneRoomTypeRequest,
} from 'src/grpc/rooms/rooms_types.pb';

import { RoomsTypesRepository } from './repository/rooms-types.repository';

import { RoomType } from './entity/room-type.entity';

@Injectable()
export class RoomsTypesService {
  constructor(private readonly roomsTypesRepository: RoomsTypesRepository) {}

  @HandleRpcExceptions()
  save(request: CreateRoomTypeRequest): void {
    this.roomsTypesRepository.save(request);
  }

  @HandleRpcExceptions()
  async findOne(request: FindOneRoomTypeRequest): Promise<RoomType> {
    const { room_type_id } = request;

    return this.roomsTypesRepository.findOne(room_type_id);
  }
}
