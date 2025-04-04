import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import { CreateRoomTypeRequest } from 'src/grpc/proto-files/rooms/rooms_types.pb';

import { RoomsTypesRepository } from './repository/rooms-types.repository';

@Injectable()
export class RoomsTypesService {
  constructor(private readonly roomsTypesRepository: RoomsTypesRepository) {}

  @HandleRpcExceptions()
  save(request: CreateRoomTypeRequest): void {
    this.roomsTypesRepository.save(request);
  }
}
