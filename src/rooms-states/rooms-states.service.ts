import { RoomsStatesRepository } from './repository/rooms-states.repository';
import { DeleteResultResponse } from 'src/common/dto/response';
import { HandleRpcExceptions } from 'src/common/decorators';
import { RoomStateResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
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
  async save(request: CreateRoomStateDto): Promise<RoomStateResponseDto> {
    const roomState = await this.roomsStatesRepository.save(request);

    return plainToInstance(RoomStateResponseDto, roomState, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOneById(
    request: FindOneRoomStateByIdDto,
  ): Promise<RoomStateResponseDto> {
    const { roomStateId } = request;
    const roomState = await this.roomsStatesRepository.findOneById(roomStateId);

    return plainToInstance(RoomStateResponseDto, roomState, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findByIds(roomsStatesIds: string[]): Promise<RoomStateResponseDto[]> {
    const roomsStates =
      await this.roomsStatesRepository.findByIds(roomsStatesIds);

    return plainToInstance(RoomStateResponseDto, roomsStates, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<RoomStateResponseDto[]> {
    const roomsStates = await this.roomsStatesRepository.findAll();

    return plainToInstance(RoomStateResponseDto, roomsStates, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(request: UpdateRoomStateDto): Promise<DeleteResultResponse> {
    const deleteResult = await this.roomsStatesRepository.update(request);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async remove(roomStateId: string): Promise<RoomStateResponseDto> {
    const roomState = await this.roomsStatesRepository.remove(roomStateId);

    return plainToInstance(RoomStateResponseDto, roomState, {
      excludeExtraneousValues: true,
    });
  }
}
