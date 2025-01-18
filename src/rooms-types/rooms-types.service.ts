import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { HandleRpcExceptions } from 'src/common/decorators';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from './dto/request';
import { RoomTypeResponseDto } from './dto/response';

import { RoomsTypesRepository } from './repository/rooms-types.repository';

@Injectable()
export class RoomsTypesService {
  constructor(private readonly roomsTypesRepository: RoomsTypesRepository) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(RoomTypeResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<RoomTypeResponseDto[]> {
    const roomsTypes = await this.roomsTypesRepository.findAll();

    return this.plainToInstanceDto(roomsTypes);
  }

  @HandleRpcExceptions()
  async findOne(roomTypeId: string): Promise<RoomTypeResponseDto> {
    const roomType = await this.roomsTypesRepository.findOne(roomTypeId);

    return this.plainToInstanceDto(roomType);
  }

  @HandleRpcExceptions()
  async findByIds(roomsTypesIds: string[]): Promise<RoomTypeResponseDto[]> {
    const roomsTypes = await this.roomsTypesRepository.findByIds(roomsTypesIds);

    return this.plainToInstanceDto(roomsTypes);
  }

  @HandleRpcExceptions()
  async save(request: CreateRoomTypeDto): Promise<RoomTypeResponseDto> {
    const newRoomType = await this.roomsTypesRepository.save(request);

    return this.plainToInstanceDto(newRoomType);
  }

  @HandleRpcExceptions()
  async update(request: UpdateRoomTypeDto): Promise<RoomTypeResponseDto> {
    const { roomTypeId, ...rest } = request;

    const roomTypeUpdated = await this.roomsTypesRepository.update(
      { roomTypeId },
      rest,
    );

    return this.plainToInstanceDto(roomTypeUpdated);
  }

  @HandleRpcExceptions()
  async remove(roomTypeId: string): Promise<DeleteResultResponse> {
    const deleteResult = await this.roomsTypesRepository.remove(roomTypeId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
