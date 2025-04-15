import { IBaseRepository } from 'src/common/repository';
import { CreateAmenityRequest } from 'src/grpc/rooms/amenities.pb';
import { Amenity } from 'src/amenities/entity/amenity.entity';

export interface IAmenitiesRepository
  extends IBaseRepository<Amenity, CreateAmenityRequest> {}
