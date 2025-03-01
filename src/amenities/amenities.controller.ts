import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  Amenity,
  GetAmenityRequest,
  CreateAmenityRequest,
  ListAmenitiesResponse,
  AmenitiesServiceController,
  AmenitiesServiceControllerMethods,
} from 'src/grpc/proto/rooms/amenities.pb';

import { AmenitiesService } from './amenities.service';

@Controller()
@AmenitiesServiceControllerMethods()
export class AmenitiesController implements AmenitiesServiceController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  createAmenity(request: CreateAmenityRequest): void {
    this.amenitiesService.createAmenity(request);
  }
  getAmenity(
    request: GetAmenityRequest,
  ): Promise<Amenity> | Observable<Amenity> | Amenity {
    return this.amenitiesService.getAmenity(request);
  }
  listAmenities():
    | Promise<ListAmenitiesResponse>
    | Observable<ListAmenitiesResponse>
    | ListAmenitiesResponse {
    return this.amenitiesService.listAmenities();
  }
}
