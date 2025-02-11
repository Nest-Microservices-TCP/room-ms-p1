import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AmenitiesService } from './amenities.service';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateAmenityDto, UpdateAmenityDto } from './dto/request';
import { AmenityResponseDto } from './dto/response';

@Controller()
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @MessagePattern('rooms.find.all.amenities')
  async findAll(): Promise<AmenityResponseDto[]> {
    return this.amenitiesService.findAll();
  }

  @MessagePattern('rooms.find.one.amenity')
  async findOne(
    @Payload('amenityId') amenityId: string,
  ): Promise<AmenityResponseDto> {
    return this.amenitiesService.findOne(amenityId);
  }

  @MessagePattern('rooms.find.amenities.by.ids')
  async findByIds(
    @Payload('amenitiesIds') amenitiesIds: string[],
  ): Promise<AmenityResponseDto[]> {
    return this.amenitiesService.findByIds(amenitiesIds);
  }

  @MessagePattern('rooms.save.amenity')
  async save(
    @Payload() request: CreateAmenityDto,
  ): Promise<AmenityResponseDto> {
    return this.amenitiesService.save(request);
  }

  @MessagePattern('rooms.update.amenity')
  async update(
    @Payload() request: UpdateAmenityDto,
  ): Promise<AmenityResponseDto> {
    return this.amenitiesService.update(request);
  }

  @MessagePattern({ cmd: 'remove.amenity.by.id' })
  async remove(@Payload() amenityId: string): Promise<DeleteResultResponse> {
    return this.amenitiesService.remove(amenityId);
  }
}
