import { HttpStatus, Injectable } from '@nestjs/common';
import { RoomsRepository } from './repositories/rooms.repository';
import { RpcException } from '@nestjs/microservices';
import { CreateRoomDto } from './dto';
import { RoomEntity } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  save(request: CreateRoomDto): Promise<RoomEntity> {
    try {
      return this.roomsRepository.save(request);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error to save room: ${error}`,
      });
    }
  }

  findOne() {
    return 'get one room';
  }

  findAll() {
    return 'get all rooms';
  }

  update() {
    return 'update one room';
  }

  delete() {
    return 'delete one room';
  }
}
