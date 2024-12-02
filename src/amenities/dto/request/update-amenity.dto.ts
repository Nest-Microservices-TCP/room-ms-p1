import { CreateAmenityDto } from './create-amenity.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';

export class UpdateAmenityDto extends PartialType(CreateAmenityDto) {
  @IsUUID()
  amenityId: string;
}
