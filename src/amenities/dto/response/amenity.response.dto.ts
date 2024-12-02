import { Expose } from 'class-transformer';

export class AmenityResponseDto {
  @Expose()
  amenityId: string;

  @Expose()
  name: string;

  @Expose()
  quantity: number;

  @Expose()
  description: string;
}
