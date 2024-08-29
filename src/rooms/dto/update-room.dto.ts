import {
  IsUUID,
  IsPositive,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class UpdateRoomDto {
  @IsUUID()
  @IsNotEmpty()
  room_id: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  number?: number;
}
