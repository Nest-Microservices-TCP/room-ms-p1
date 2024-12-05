import { Injectable } from '@nestjs/common';
import { AmenitiesRepository } from './repository/amenities.repository';

@Injectable()
export class AmenitiesService {
  constructor(private readonly amenitiesRepository: AmenitiesRepository) {}
}
