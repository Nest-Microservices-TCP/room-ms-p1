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

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(RoomResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async save(request: CreateRoomDto): Promise<RoomResponseDto> {
    const newRoom = await this.roomsRepository.save(request);

    return this.plainToInstanceDto(newRoom);
  }

  @HandleRpcExceptions()
  async findOne(roomId: string): Promise<RoomResponseDto> {
    const room = await this.roomsRepository.findOne(roomId);

    return this.plainToInstanceDto(room);
  }

  @HandleRpcExceptions()
  async findByIds(roomsIds: string[]): Promise<RoomResponseDto[]> {
    const rooms = await this.roomsRepository.findByIds(roomsIds);

    return this.plainToInstanceDto(rooms);
  }

  @HandleRpcExceptions()
  async findAll(): Promise<RoomResponseDto[]> {
    const rooms = await this.roomsRepository.findAll();

    return this.plainToInstanceDto(rooms);
  }

  @HandleRpcExceptions()
  async update(request: UpdateRoomDto) {
    const { roomId, ...rest } = request;

    const updatedRoom = await this.roomsRepository.update({ roomId }, rest);

    return this.plainToInstanceDto(updatedRoom);
  }

  @HandleRpcExceptions()
  async remove(roomId: string): Promise<DeleteResultResponse> {
    const deleteResult = await this.roomsRepository.remove(roomId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
