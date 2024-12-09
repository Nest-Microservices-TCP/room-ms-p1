import { RoomsRepository } from './repositories/rooms.repository';
import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRoomDto, UpdateRoomDto } from './dto/request';
import { HandleRpcExceptions } from 'src/common/decorators';
import { plainToInstance } from 'class-transformer';
import { RoomResponseDto } from './dto/response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  @HandleRpcExceptions()
  async save(request: CreateRoomDto): Promise<RoomResponseDto> {
    const room = await this.roomsRepository.save(request);

    return plainToInstance(RoomResponseDto, room, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOne(roomId: string): Promise<RoomResponseDto> {
    const room = await this.roomsRepository.findOne(roomId);

    return plainToInstance(RoomResponseDto, room, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findByIds(roomsIds: string[]): Promise<RoomResponseDto[]> {
    const rooms = await this.roomsRepository.findByIds(roomsIds);

    return plainToInstance(RoomResponseDto, rooms, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<RoomResponseDto[]> {
    const rooms = await this.roomsRepository.findAll();

    return plainToInstance(RoomResponseDto, rooms, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(request: UpdateRoomDto) {
    const room = await this.roomsRepository.update(request);

    return plainToInstance(RoomResponseDto, room, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async remove(roomId: string): Promise<DeleteResultResponse> {
    const deleteResult = await this.roomsRepository.remove(roomId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
