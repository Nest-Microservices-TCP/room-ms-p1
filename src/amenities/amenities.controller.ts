import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  Amenity,
  CreateAmenityRequest,
  FindAmenitiesResponse,
  FindOneAmenityRequest,
  AmenitiesServiceController,
  AmenitiesServiceControllerMethods,
} from 'src/grpc/proto/rooms/amenities.pb';

import { AmenitiesService } from './amenities.service';

@Controller()
@AmenitiesServiceControllerMethods()
export class AmenitiesController implements AmenitiesServiceController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  save(request: CreateAmenityRequest): void {
    this.amenitiesService.save(request);
  }
  findOne(
    request: FindOneAmenityRequest,
  ): Promise<Amenity> | Observable<Amenity> | Amenity {
    return this.amenitiesService.findOne(request);
  }
  find():
    | Promise<FindAmenitiesResponse>
    | Observable<FindAmenitiesResponse>
    | FindAmenitiesResponse {
    return this.amenitiesService.find();
  }
}
