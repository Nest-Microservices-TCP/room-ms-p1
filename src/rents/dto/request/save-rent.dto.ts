import {
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Room as IRoom } from 'src/grpc/rooms/rooms.pb';
import { AccommodationType } from 'src/grpc/rooms/rates.pb';
import { EntryType, RentState } from 'src/grpc/rooms/rents.pb';

import { Room } from 'src/rooms/entity/room.entity';
import { PaymentState } from 'src/grpc/common/common_enums.pb';

export class SaveRentDto {
  @IsDate()
  checkout_date: Date;

  @IsEnum(EntryType)
  entry_type: EntryType;

  @IsNumber()
  @IsPositive()
  total_income: number;

  @IsEnum(RentState)
  @IsOptional()
  rent_state?: RentState;

  @IsEnum(PaymentState)
  @IsOptional()
  payment_state?: PaymentState;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  guest_name?: string;

  @IsEnum(AccommodationType)
  accommodation_type: AccommodationType;

  @Type(() => Room)
  room: IRoom;
}
