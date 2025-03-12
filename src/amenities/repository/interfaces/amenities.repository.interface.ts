import { IRepository } from 'src/common/repository';
import { CreateAmenityRequest } from 'src/grpc/proto/rooms/amenities.pb';
import { Amenity } from 'src/amenities/entity/amenity.entity';

export interface IAmenitiesRepository
  extends IRepository<Amenity, CreateAmenityRequest> {}
