import { Extra } from 'src/extras/entity/extra.entity';
import { RentEntity } from 'src/rents/entity';
import { Expose } from 'class-transformer';

export class RentExtraResponseDto {
  @Expose()
  rentExtraId: string;

  @Expose()
  quantity: number;

  @Expose()
  total: number;

  @Expose()
  rent: RentEntity;

  @Expose()
  extra: Extra;
}
