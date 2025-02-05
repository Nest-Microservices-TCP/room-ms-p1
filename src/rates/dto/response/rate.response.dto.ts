import { BaseResponseDto } from 'src/common/dto/response';
import { AccommodationType } from 'src/rents/enum';
import { Expose } from 'class-transformer';

export class RateResponseDto extends BaseResponseDto {
  @Expose()
  rateId: string;

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
