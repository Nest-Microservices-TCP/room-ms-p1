import { Injectable } from '@nestjs/common';
import { RoomsRepository } from './repositories/rooms.repository';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CreateRoomDto, UpdateRoomDto } from './dto/request';
import { RoomResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';

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
  async findOneById(id: string): Promise<RoomResponseDto> {
    const room = await this.roomsRepository.findOneById(id);

    return plainToInstance(RoomResponseDto, room, {
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
  async deleteById(id: string): Promise<RoomResponseDto> {
    const room = await this.roomsRepository.deleteById(id);

    return plainToInstance(RoomResponseDto, room, {
      excludeExtraneousValues: true,
    });
  }
}
