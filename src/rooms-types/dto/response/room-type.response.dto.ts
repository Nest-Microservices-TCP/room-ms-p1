import { Expose } from 'class-transformer';

export class RoomTypeResponseDto {
  @Expose()
  roomTypeId: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  includedPeople: number;
}
