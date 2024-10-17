import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { AccommodationType, EntryType } from 'src/rents/enum';

export class CreateRentDto {
  @IsString()
  @MaxLength(255)
  @IsOptional()
  guestName: string;

  @IsEnum(AccommodationType)
  accommodationType: AccommodationType;

  @IsEnum(EntryType)
  entryType: EntryType;

  @IsNumber()
  @IsPositive()
  @Min(1)
  guestsNumber: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  extraAccommodations: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  extraPeople: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  overtime: number;
}
