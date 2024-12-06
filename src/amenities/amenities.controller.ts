import { Controller } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { AmenityResponseDto } from './dto/response';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAmenityDto, UpdateAmenityDto } from './dto/request';

@Controller()
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @MessagePattern({ cmd: 'find.all.amenities' })
  async findAll(): Promise<AmenityResponseDto[]> {
    return this.amenitiesService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.amenity.by.id' })
  async findOneById(
    @Payload('amenityId') amenityId: string,
  ): Promise<AmenityResponseDto> {
    return this.amenitiesService.findOneById(amenityId);
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
}
