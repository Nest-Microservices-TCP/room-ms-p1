import { Controller } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { AmenityResponseDto } from './dto/response';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @MessagePattern({ cmd: 'find.all.amenities' })
  async findAll(): Promise<AmenityResponseDto[]> {
    return this.amenitiesService.findAll();
  }
}
