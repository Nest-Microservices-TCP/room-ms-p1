import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateRoomTypeDto {
  @IsUUID('4')
  roomTypeId: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  includedPeople?: number;
}
