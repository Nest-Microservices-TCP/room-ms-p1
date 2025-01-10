import { Controller } from '@nestjs/common';

import { RoomsTypesAmenitiesService } from './rooms-types-amenities.service';

@Controller()
export class RoomsTypesAmenitiesController {
  constructor(
    private readonly roomsTypesAmenitiesService: RoomsTypesAmenitiesService,
  ) {}
}
