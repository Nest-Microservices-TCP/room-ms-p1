import { IBaseRepository } from 'src/common/repository';

import {
  CreateRoomTypeAmenityDto,
  UpdateRoomTypeAmenityDto,
} from 'src/rooms-types-amenities/dto/request';

import { RoomTypeAmenity } from 'src/rooms-types-amenities/entity/room-type-amenity.entity';

export interface IRoomsTypesAmenities
  extends IBaseRepository<
    RoomTypeAmenity,
    CreateRoomTypeAmenityDto,
    UpdateRoomTypeAmenityDto
  > {}
