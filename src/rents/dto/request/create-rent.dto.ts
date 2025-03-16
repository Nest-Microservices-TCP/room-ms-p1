import {
  IsEnum,
  IsUUID,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { EntryType } from 'src/rents/enum';

export class CreateRentDto {
  @IsUUID('4')
  rate_id: string;

  @IsUUID('4')
  room_id: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  extra_accommodations: number = 0;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  extra_people: number = 0;

  @IsEnum(EntryType)
  @IsOptional()
  entry_type: EntryType = EntryType.WALKING;
}
