import { Injectable } from '@nestjs/common';
import { RoomsRepository } from './repositories/rooms.repository';
import { RoomEntity } from './entities/room.entity';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CreateRoomDto, UpdateRoomDto } from './dto/request';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  @HandleRpcExceptions()
  save(request: CreateRoomDto): Promise<RoomEntity> {
    return this.roomsRepository.save(request);
  }

  @HandleRpcExceptions()
  findOneById(id: string): Promise<RoomEntity> {
    return this.roomsRepository.findOneById(id);
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
