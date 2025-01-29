import { Extra } from 'src/extras/entity/extra.entity';
import { Rent } from 'src/rents/entity';
import { Expose } from 'class-transformer';

export class RentExtraResponseDto {
  @Expose()
  rentExtraId: string;

  @Expose()
  quantity: number;

  @Expose()
  total: number;

  @Expose()
  rent: Rent;

  @Expose()
  extra: Extra;
}
