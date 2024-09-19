import { Injectable } from '@nestjs/common';
import { RoomStateEntity } from './entities/room-state.entity';
import { RoomsStatesRepository } from './repositories/rooms-state.repository';
import {
  UpdateRoomStateDto,
  CreateRoomStateDto,
  FindOneRoomStateByIdDto,
} from './dto/request';
import { HandleRpcExceptions } from 'src/common/decorators';
import { RoomStateResponse } from './dto/response';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RoomsStatesService {
  constructor(private readonly roomsStatesRepository: RoomsStatesRepository) {}

  @HandleRpcExceptions()
  async save(request: CreateRoomStateDto): Promise<RoomStateResponse> {
    const roomState = await this.roomsStatesRepository.save(request);

    return plainToInstance(RoomStateResponse, roomState, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOneById(
    request: FindOneRoomStateByIdDto,
  ): Promise<RoomStateResponse> {
    const { roomStateId } = request;
    const roomState = await this.roomsStatesRepository.findOneById(roomStateId);

    return plainToInstance(RoomStateResponse, roomState, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<RoomStateResponse[]> {
    const roomsStates = await this.roomsStatesRepository.findAll();

    return plainToInstance(RoomStateResponse, roomsStates, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(request: UpdateRoomStateDto): Promise<RoomStateResponse> {
    const roomState = await this.roomsStatesRepository.update(request);

    return plainToInstance(RoomStateResponse, roomState, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  deleteById(id: string): Promise<RoomStateEntity> {
    return this.roomsStatesRepository.deleteById(id);
  }
}
