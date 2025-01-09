import { Expose } from 'class-transformer';

import { Amenity } from 'src/amenities/entity/amenity.entity';
import { RoomType } from 'src/rooms-types/entity/room-type.entity';

export class RoomTypeAmenityResponseDto {
  @Expose()
  roomTypeAmenityId: string;

  @Expose()
  amenityQuantity: number;

  @Expose()
  roomType: RoomType;

  @Expose()
  amenity: Amenity;
}
