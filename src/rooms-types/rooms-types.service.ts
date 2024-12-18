import { RoomsTypesRepository } from './repository/rooms-types.repository';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from './dto/request';
import { HandleRpcExceptions } from 'src/common/decorators';
import { RoomTypeResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsTypesService {
  constructor(private readonly roomsTypesRepository: RoomsTypesRepository) {}

  @HandleRpcExceptions()
  async findAll(): Promise<RoomTypeResponseDto[]> {
    const roomsTypes = await this.roomsTypesRepository.findAll();

    return plainToInstance(RoomTypeResponseDto, roomsTypes, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOne(roomTypeId: string): Promise<RoomTypeResponseDto> {
    const roomType = await this.roomsTypesRepository.findOne(roomTypeId);

    return plainToInstance(RoomTypeResponseDto, roomType, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findByIds(roomsTypesIds: string[]): Promise<RoomTypeResponseDto[]> {
    const roomsTypes = await this.roomsTypesRepository.findByIds(roomsTypesIds);

    return plainToInstance(RoomTypeResponseDto, roomsTypes, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async save(request: CreateRoomTypeDto): Promise<RoomTypeResponseDto> {
    const newRoomType = await this.roomsTypesRepository.save(request);

    return plainToInstance(RoomTypeResponseDto, newRoomType, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(request: UpdateRoomTypeDto): Promise<RoomTypeResponseDto> {
    const roomTypeUpdated = await this.roomsTypesRepository.update(request);

    return plainToInstance(RoomTypeResponseDto, roomTypeUpdated, {
      excludeExtraneousValues: true,
    });
  }
}
