import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { HandleRpcExceptions } from 'src/common/decorators';

import { DeleteResultResponse } from 'src/common/dto/response';
import {
  CreateRoomStateDto,
  FindOneRoomStateByIdDto,
  UpdateRoomStateDto,
} from './dto/request';
import { RoomStateResponseDto } from './dto/response';

import { RoomsStatesRepository } from './repository/rooms-states.repository';

@Injectable()
export class RoomsStatesService {
  constructor(private readonly roomsStatesRepository: RoomsStatesRepository) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(RoomStateResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async save(request: CreateRoomStateDto): Promise<RoomStateResponseDto> {
    const newRoomState = await this.roomsStatesRepository.save(request);

    return this.plainToInstanceDto(newRoomState);
  }

  @HandleRpcExceptions()
  async findOne(
    request: FindOneRoomStateByIdDto,
  ): Promise<RoomStateResponseDto> {
    const { roomStateId } = request;
    const roomState = await this.roomsStatesRepository.findOne(roomStateId);

    return this.plainToInstanceDto(roomState);
  }

  @HandleRpcExceptions()
  async findByIds(roomsStatesIds: string[]): Promise<RoomStateResponseDto[]> {
    const roomsStates =
      await this.roomsStatesRepository.findByIds(roomsStatesIds);

    return this.plainToInstanceDto(roomsStates);
  }

  @HandleRpcExceptions()
  async findAll(): Promise<RoomStateResponseDto[]> {
    const roomsStates = await this.roomsStatesRepository.findAll();

    return this.plainToInstanceDto(roomsStates);
  }

  @HandleRpcExceptions()
  async update(request: UpdateRoomStateDto): Promise<RoomStateResponseDto> {
    const { roomStateId, ...rest } = request;

    const roomStateUpdated = await this.roomsStatesRepository.update(
      { roomStateId },
      rest,
    );

    return this.plainToInstanceDto(roomStateUpdated);
  }

  @HandleRpcExceptions()
  async remove(roomStateId: string): Promise<DeleteResultResponse> {
    const deleteResult = await this.roomsStatesRepository.remove(roomStateId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
