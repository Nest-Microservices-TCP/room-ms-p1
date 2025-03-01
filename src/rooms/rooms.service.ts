import { Injectable } from '@nestjs/common';

import { HandleRpcExceptions } from 'src/common/decorators';

import {
  GetRoomRequest,
  ListRoomsResponse,
  CreateRoomRequest,
} from 'src/grpc/proto/rooms/rooms.pb';

import { Room } from './entity/room.entity';

import { RoomsRepository } from './repositories/rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  @HandleRpcExceptions()
  createRoom(request: CreateRoomRequest): void {
    this.roomsRepository.save(request);
  }

  @HandleRpcExceptions()
  async getRoom(request: GetRoomRequest): Promise<Room> {
    const { room_id } = request;

    return this.roomsRepository.findOne(room_id);
  }

  @HandleRpcExceptions()
  async listRooms(): Promise<ListRoomsResponse> {
    const rooms = await this.roomsRepository.findAll();

    return { rooms };
  }
}
