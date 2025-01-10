import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { RoomsTypesAmenitiesService } from './rooms-types-amenities.service';

import { RoomTypeAmenityResponseDto } from './dto/response/room-type-amenity.response.dto';
import { CreateRoomTypeAmenityDto } from './dto/request';

@Controller()
export class RoomsTypesAmenitiesController {
  constructor(
    private readonly roomsTypesAmenitiesService: RoomsTypesAmenitiesService,
  ) {}

  @MessagePattern({ cdm: 'find.all.rooms.types.amenities' })
  async findAll(): Promise<RoomTypeAmenityResponseDto[]> {
    return this.roomsTypesAmenitiesService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.room.type.amenity' })
  async findOne(
    @Payload('roomTypeAmenityId') roomTypeAmenityId: string,
  ): Promise<RoomTypeAmenityResponseDto> {
    return this.roomsTypesAmenitiesService.findOne(roomTypeAmenityId);
  }

  @MessagePattern({ cmd: 'save.room.type.amenity' })
  async save(
    @Payload() request: CreateRoomTypeAmenityDto,
  ): Promise<RoomTypeAmenityResponseDto> {
    return this.roomsTypesAmenitiesService.save(request);
  }
}
