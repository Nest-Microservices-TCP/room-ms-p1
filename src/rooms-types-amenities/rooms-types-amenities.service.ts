import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

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
}
