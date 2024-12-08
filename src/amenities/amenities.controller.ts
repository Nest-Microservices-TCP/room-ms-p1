import { CreateAmenityDto, UpdateAmenityDto } from './dto/request';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeleteResultResponse } from 'src/common/dto/response';
import { AmenitiesService } from './amenities.service';
import { AmenityResponseDto } from './dto/response';
import { Controller } from '@nestjs/common';

@Controller()
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @MessagePattern({ cmd: 'find.all.amenities' })
  async findAll(): Promise<AmenityResponseDto[]> {
    return this.amenitiesService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.amenity.by.id' })
  async findOne(
    @Payload('amenityId') amenityId: string,
  ): Promise<AmenityResponseDto> {
    return this.amenitiesService.findOne(amenityId);
  }

  @MessagePattern({ cmd: 'find.amenities.by.ids' })
  async findByIds(
    @Payload('amenitiesIds') amenitiesIds: string[],
  ): Promise<AmenityResponseDto[]> {
    return this.amenitiesService.findByIds(amenitiesIds);
  }

  @MessagePattern({ cmd: 'save.amenity' })
  async save(
    @Payload() request: CreateAmenityDto,
  ): Promise<AmenityResponseDto> {
    return this.amenitiesService.save(request);
  }

  @MessagePattern({ cmd: 'update.amenity' })
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
