import { Expose } from 'class-transformer';
import { AccommodationType } from 'src/rents/enum';

export class RateResponseDto {
  @Expose()
  rate_id: string;

  @Expose()
  name: string;

  @Expose()
  duration: string;

  @Expose()
  accommodationCost: number;

  @Expose()
  extraAccommodationCost: number;

  @Expose()
  overtimeCost: number;

  @Expose()
  extraPeopleCost: number;

  @Expose()
  earlyCheckinCost: number;

  @Expose()
  accommodationType: AccommodationType;

  @Expose()
  checkInHour: string;

  @Expose()
  checkoutHour: string;
}
