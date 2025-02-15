import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { RoomsTypesAmenitiesService } from './rooms-types-amenities.service';

import { DeleteResultResponse } from 'src/common/dto/response';
import {
  CreateRoomTypeAmenityDto,
  UpdateRoomTypeAmenityDto,
} from './dto/request';
import { RoomTypeAmenityResponseDto } from './dto/response/room-type-amenity.response.dto';

@Controller()
export class RoomsTypesAmenitiesController {
  constructor(
    private readonly roomsTypesAmenitiesService: RoomsTypesAmenitiesService,
  ) {}

  @MessagePattern('rooms.find.all.roomsTypesAmenities')
  async findAll(): Promise<RoomTypeAmenityResponseDto[]> {
    return this.roomsTypesAmenitiesService.findAll();
  }

  @MessagePattern('rooms.find.one.roomTypeAmenity')
  async findOne(
    @Payload('roomTypeAmenityId') roomTypeAmenityId: string,
  ): Promise<RoomTypeAmenityResponseDto> {
    return this.roomsTypesAmenitiesService.findOne(roomTypeAmenityId);
  }

  @MessagePattern('rooms.save.roomTypeAmenity')
  async save(
    @Payload() request: CreateRoomTypeAmenityDto,
  ): Promise<RoomTypeAmenityResponseDto> {
    return this.roomsTypesAmenitiesService.save(request);
  }

  @MessagePattern('rooms.update.roomTypeAmenity')
  async update(
    @Payload() request: UpdateRoomTypeAmenityDto,
  ): Promise<RoomTypeAmenityResponseDto> {
    return this.roomsTypesAmenitiesService.update(request);
  }

  @MessagePattern('rooms.remove.roomTypeAmenity')
  async remove(
    @Payload('roomTypeAmenityId') roomTypeAmenityId: string,
  ): Promise<DeleteResultResponse> {
    return this.roomsTypesAmenitiesService.remove(roomTypeAmenityId);
  }
}
