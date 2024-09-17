import { Injectable } from '@nestjs/common';
import { RoomsRepository } from './repositories/rooms.repository';
import { RoomEntity } from './entities/room.entity';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CreateRoomDto, UpdateRoomDto } from './dto/request';
import { RoomResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  @HandleRpcExceptions()
  save(request: CreateRoomDto): Promise<RoomEntity> {
    return this.roomsRepository.save(request);
  }

  @HandleRpcExceptions()
  async findOneById(id: string): Promise<RoomResponseDto> {
    const room = await this.roomsRepository.findOneById(id);

    return plainToInstance(RoomResponseDto, room, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  findAll(): Promise<RoomEntity[]> {
    return this.roomsRepository.findAll();
  }

  @HandleRpcExceptions()
  update(request: UpdateRoomDto) {
    return this.roomsRepository.update(request);
  }

  @HandleRpcExceptions()
  deleteById(id: string): Promise<RoomEntity> {
    return this.roomsRepository.deleteById(id);
  }
}
