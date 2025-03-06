import { Injectable } from '@nestjs/common';

import { HandleRpcExceptions } from 'src/common/decorators';

import {
  FindRoomsResponse,
  CreateRoomRequest,
  FindOneRoomRequest,
} from 'src/grpc/proto/rooms/rooms.pb';

import { RoomsRepository } from './repositories/rooms.repository';

import { Room } from './entity/room.entity';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  @HandleRpcExceptions()
  save(request: CreateRoomRequest): void {
    this.roomsRepository.save(request);
  }

  @HandleRpcExceptions()
  async findOne(request: FindOneRoomRequest): Promise<Room> {
    const { room_id } = request;

    return this.roomsRepository.findOne(room_id);
  }

  @HandleRpcExceptions()
  async find(): Promise<FindRoomsResponse> {
    const rooms = await this.roomsRepository.findAll();

    return { rooms };
  }
}
