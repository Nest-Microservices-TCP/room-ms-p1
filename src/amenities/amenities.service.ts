import { Injectable } from '@nestjs/common';

import { HandleRpcExceptions } from 'src/common/decorators';

import {
  CreateAmenityRequest,
  FindOneAmenityRequest,
  FindAmenitiesResponse,
  FindAmenitiesByIdsRequest,
} from 'src/grpc/rooms/amenities.pb';

import { AmenitiesRepository } from './repository/amenities.repository';

import { Amenity } from './entity/amenity.entity';

@Injectable()
export class AmenitiesService {
  constructor(private readonly amenitiesRepository: AmenitiesRepository) {}

  @HandleRpcExceptions()
  save(request: CreateAmenityRequest): void {
    this.amenitiesRepository.save(request);
  }

  @HandleRpcExceptions()
  async find(): Promise<FindAmenitiesResponse> {
    const amenities = await this.amenitiesRepository.find();

    return { amenities };
  }

  @HandleRpcExceptions()
  async findOne(request: FindOneAmenityRequest): Promise<Amenity> {
    const { amenity_id } = request;

    return this.amenitiesRepository.findOne(amenity_id);
  }

  @HandleRpcExceptions()
  async findByIds(
    request: FindAmenitiesByIdsRequest,
  ): Promise<FindAmenitiesResponse> {
    const { amenities_ids } = request;

    const amenities = await this.amenitiesRepository.findByIds(amenities_ids);

    return { amenities };
  }
}
