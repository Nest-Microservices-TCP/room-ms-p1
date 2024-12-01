import { IsString, MaxLength } from 'class-validator';

export class CreateAmenityDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(255)
  description: string;
}
