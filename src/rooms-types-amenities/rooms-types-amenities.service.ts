import { Injectable } from '@nestjs/common';

import { RoomsTypesAmenitiesRepository } from './repository/rooms-types-amenities.repository';

@Injectable()
export class RoomsTypesAmenitiesService {
  constructor(
    private readonly roomsTypesAmenitiesRepository: RoomsTypesAmenitiesRepository,
  ) {}
}
