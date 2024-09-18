import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoomStateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
