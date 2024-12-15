import {
  Min,
  IsNumber,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateRoomTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  includedPeople?: number;
}
