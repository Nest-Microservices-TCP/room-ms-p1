import { RoomsStatesRepository } from './repository/rooms-state.repository';
import { HandleRpcExceptions } from 'src/common/decorators';
import { plainToInstance } from 'class-transformer';
import { RoomStateResponse } from './dto/response';
import { Injectable } from '@nestjs/common';
import {
  UpdateRoomStateDto,
  CreateRoomStateDto,
  FindOneRoomStateByIdDto,
} from './dto/request';

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
  async findByIds(roomsStatesIds: string[]): Promise<RoomStateResponse[]> {
    const roomsStates =
      await this.roomsStatesRepository.findByIds(roomsStatesIds);

    return plainToInstance(RoomStateResponse, roomsStates, {
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
  async remove(roomStateId: string): Promise<RoomStateResponse> {
    const roomState = await this.roomsStatesRepository.remove(roomStateId);

    return plainToInstance(RoomStateResponse, roomState, {
      excludeExtraneousValues: true,
    });
  }
}
