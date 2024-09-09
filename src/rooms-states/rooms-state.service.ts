import { Injectable } from '@nestjs/common';
import { RoomStateEntity } from './entities/room-state.entity';
import { CreateRoomStateDto } from './dto/create-room-state.dto';
import { FindOneRoomStateByIdDto } from './dto/find-one-room-state-by-id.dto';
import { RoomsStatesRepository } from './repositories/rooms-state.repository';
import { UpdateRoomStateDto } from './dto';
import { HandleRpcExceptions } from 'src/common/decorators';

@Injectable()
export class RoomsStatesService {
  constructor(private readonly roomsStatesRepository: RoomsStatesRepository) {}

  @HandleRpcExceptions()
  async save(request: CreateRoomStateDto): Promise<RoomStateEntity> {
    return this.roomsStatesRepository.save(request);
  }

  @HandleRpcExceptions()
  async findOneById(
    request: FindOneRoomStateByIdDto,
  ): Promise<RoomStateEntity> {
    const { roomStateId } = request;
    return this.roomsStatesRepository.findOneById(roomStateId);
  }

  @HandleRpcExceptions()
  async findAll(): Promise<RoomStateEntity[]> {
    return this.roomsStatesRepository.findAll();
  }

  @HandleRpcExceptions()
  update(request: UpdateRoomStateDto): Promise<RoomStateEntity> {
    return this.roomsStatesRepository.update(request);
  }

  @HandleRpcExceptions()
  deleteById(id: string): Promise<RoomStateEntity> {
    return this.roomsStatesRepository.deleteById(id);
  }
}
