import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { HandleRpcExceptions } from 'src/common/decorators';

import { RoomsTypesAmenitiesRepository } from './repository/rooms-types-amenities.repository';

import { RoomTypeAmenityResponseDto } from './dto/response/room-type-amenity.response.dto';

@Injectable()
export class RoomsTypesAmenitiesService {
  constructor(
    private readonly roomsTypesAmenitiesRepository: RoomsTypesAmenitiesRepository,
  ) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(RoomTypeAmenityResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<RoomTypeAmenityResponseDto[]> {
    const roomsTypesAmenities =
      await this.roomsTypesAmenitiesRepository.findAll();

    return this.plainToInstanceDto(roomsTypesAmenities);
  }

  @HandleRpcExceptions()
  async findOne(
    roomTypeAmenityId: string,
  ): Promise<RoomTypeAmenityResponseDto> {
    const roomTypeAmenity =
      await this.roomsTypesAmenitiesRepository.findOne(roomTypeAmenityId);

    return this.plainToInstanceDto(roomTypeAmenity);
  }
}
