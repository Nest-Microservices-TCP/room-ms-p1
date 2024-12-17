import { RoomsTypesRepository } from './repository/rooms-types.repository';
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
}
