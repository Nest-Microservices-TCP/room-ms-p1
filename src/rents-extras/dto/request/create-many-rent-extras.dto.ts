import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { CreateRentExtraDto } from './create-rent-extra.dto';

export class CreateManyRentExtrasDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => CreateRentExtraDto)
  rent_extras: CreateRentExtraDto[];
}
