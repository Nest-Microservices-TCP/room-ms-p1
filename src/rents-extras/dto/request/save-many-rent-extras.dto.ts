import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { SaveRentExtraDto } from './save-rent-extra.dto';
import { Type } from 'class-transformer';

export class SaveManyRentsExtrasDto {
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => SaveRentExtraDto)
  rents_extras: SaveRentExtraDto[];
}
