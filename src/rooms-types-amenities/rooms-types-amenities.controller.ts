import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { RoomsTypesAmenitiesService } from './rooms-types-amenities.service';

import {
  CreateRoomTypeAmenityDto,
  UpdateRoomTypeAmenityDto,
} from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { RoomTypeAmenityResponseDto } from './dto/response/room-type-amenity.response.dto';

@Controller()
export class RoomsTypesAmenitiesController {
  constructor(
    private readonly roomsTypesAmenitiesService: RoomsTypesAmenitiesService,
  ) {}

  @MessagePattern('roomsTypesAmenities.find.all')
  async find(): Promise<RoomTypeAmenityResponseDto[]> {
    return this.roomsTypesAmenitiesService.find();
  }

  @MessagePattern('roomsTypesAmenities.find.one')
  async findOne(
    @Payload('roomTypeAmenityId') roomTypeAmenityId: string,
  ): Promise<RoomTypeAmenityResponseDto> {
    return this.roomsTypesAmenitiesService.findOne(roomTypeAmenityId);
  }

  @MessagePattern('roomsTypesAmenities.save')
  async save(
    @Payload() request: CreateRoomTypeAmenityDto,
  ): Promise<RoomTypeAmenityResponseDto> {
    return this.roomsTypesAmenitiesService.save(request);
  }

  @MessagePattern('roomsTypesAmenities.update')
  async update(
    @Payload() request: UpdateRoomTypeAmenityDto,
  ): Promise<RoomTypeAmenityResponseDto> {
    return this.roomsTypesAmenitiesService.update(request);
  }

  @MessagePattern('roomsTypesAmenities.remove')
  async remove(
    @Payload('roomTypeAmenityId') roomTypeAmenityId: string,
  ): Promise<DeleteResultResponse> {
    return this.roomsTypesAmenitiesService.remove(roomTypeAmenityId);
  }
}
