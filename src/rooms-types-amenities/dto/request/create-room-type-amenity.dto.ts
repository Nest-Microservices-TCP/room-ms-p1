import { Type } from 'class-transformer';
import { IsNumber, IsPositive, Min, ValidateNested } from 'class-validator';

import { Amenity } from 'src/amenities/entity/amenity.entity';
import { RoomType } from 'src/rooms-types/entity/room-type.entity';

export class CreateRoomTypeAmenityDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  amenityQuantity: number;

  @ValidateNested()
  @Type(() => RoomType)
  roomType: RoomType;

  @ValidateNested()
  @Type(() => Amenity)
  amenity: Amenity;
}
