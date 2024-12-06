import { Controller } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { AmenityResponseDto } from './dto/response';
import { MessagePattern, Payload } from '@nestjs/microservices';

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
}
