import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { RoomsTypesAmenitiesService } from './rooms-types-amenities.service';

import { RoomTypeAmenityResponseDto } from './dto/response/room-type-amenity.response.dto';

@Controller()
export class RoomsTypesAmenitiesController {
  constructor(
    private readonly roomsTypesAmenitiesService: RoomsTypesAmenitiesService,
  ) {}

  @MessagePattern({ cdm: 'find.all.rooms.types.amenities' })
  async findAll(): Promise<RoomTypeAmenityResponseDto[]> {
    return this.roomsTypesAmenitiesService.findAll();
  }
}
