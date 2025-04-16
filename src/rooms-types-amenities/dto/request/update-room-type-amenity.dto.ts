import { IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { CreateRoomTypeAmenityDto } from './create-room-type-amenity.dto';

export class UpdateRoomTypeAmenityDto extends PartialType(
  CreateRoomTypeAmenityDto,
) {
  @IsUUID('4')
  roomTypeAmenityId: string;
}
