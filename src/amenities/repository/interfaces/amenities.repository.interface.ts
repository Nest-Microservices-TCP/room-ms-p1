import { IRepository } from 'src/common/repository';
import { Amenity } from 'src/amenities/entity/amenity.entity';
import { CreateAmenityRequest } from 'src/grpc/proto/rooms/amenities.pb';

export interface IAmenitiesRepository
  extends IRepository<Amenity, CreateAmenityRequest> {}
