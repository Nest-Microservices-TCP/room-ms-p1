import { Controller } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';

@Controller()
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}
}
