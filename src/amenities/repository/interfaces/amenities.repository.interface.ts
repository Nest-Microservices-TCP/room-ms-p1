import { CreateAmenityDto, UpdateAmenityDto } from 'src/amenities/dto/request';
import { AmenityEntity } from 'src/amenities/entity/amenity.entity';
import { IBaseRepository } from 'src/common/interfaces';

export interface IAmenitiesRepository
  extends IBaseRepository<AmenityEntity, CreateAmenityDto, UpdateAmenityDto> {}
