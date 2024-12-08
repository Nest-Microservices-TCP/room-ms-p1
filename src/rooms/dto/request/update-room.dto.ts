import {
  IsUUID,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class UpdateRoomDto {
  @IsUUID()
  @IsNotEmpty()
  roomId: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  number?: number;
}
