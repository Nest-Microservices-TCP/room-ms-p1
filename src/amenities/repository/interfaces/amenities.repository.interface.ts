import { CreateAmenityDto } from 'src/amenities/dto/request';
import { Amenity } from 'src/amenities/entity/amenity.entity';
import { IRepository } from 'src/common/repository';

export interface IAmenitiesRepository
  extends IRepository<Amenity, CreateAmenityDto> {}
