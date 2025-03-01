import { Injectable } from '@nestjs/common';

import { HandleRpcExceptions } from 'src/common/decorators';

import {
  GetAmenityRequest,
  CreateAmenityRequest,
  ListAmenitiesResponse,
} from 'src/grpc/proto/rooms/amenities.pb';

import { AmenitiesRepository } from './repository/amenities.repository';

import { Amenity } from './entity/amenity.entity';

@Injectable()
export class AmenitiesService {
  constructor(private readonly amenitiesRepository: AmenitiesRepository) {}

  @HandleRpcExceptions()
  createAmenity(request: CreateAmenityRequest): void {
    this.amenitiesRepository.save(request);
  }

  @HandleRpcExceptions()
  async listAmenities(): Promise<ListAmenitiesResponse> {
    const amenities = await this.amenitiesRepository.findAll();

    return { amenities };
  }

  @HandleRpcExceptions()
  async getAmenity(request: GetAmenityRequest): Promise<Amenity> {
    const { amenity_id } = request;

    return this.amenitiesRepository.findOne(amenity_id);
  }
}
