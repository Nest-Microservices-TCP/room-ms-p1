import { HttpStatus, Injectable } from '@nestjs/common';
import { RoomsRepository } from './repositories/rooms.repository';
import { RpcException } from '@nestjs/microservices';
import { CreateRoomDto, UpdateRoomDto } from './dto';
import { RoomEntity } from './entities/room.entity';
import { HandleRpcExceptions } from 'src/common/decorators';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  @HandleRpcExceptions()
  save(request: CreateRoomDto): Promise<RoomEntity> {
    return this.roomsRepository.save(request);
  }

  findOneById(id: string): Promise<RoomEntity> {
    try {
      return this.roomsRepository.findOneById(id);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error to get room by ID: ${error}`,
      });
    }
  }

  findAll(): Promise<RoomEntity[]> {
    try {
      return this.roomsRepository.findAll();
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error to get the rooms: ${error}`,
      });
    }
  }

  update(request: UpdateRoomDto) {
    try {
      return this.roomsRepository.update(request);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error to update room: ${error}`,
      });
    }
  }

  deleteById(id: string): Promise<RoomEntity> {
    try {
      return this.roomsRepository.deleteById(id);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error to update the room: ${error}`,
      });
    }
  }
}
