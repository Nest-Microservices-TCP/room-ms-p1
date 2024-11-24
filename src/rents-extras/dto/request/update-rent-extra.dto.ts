import { ExtraEntity } from 'src/extras/entity/extra.entity';
import { RentEntity } from 'src/rents/entity';

export class UpdateRentExtraDto {
  quantity: number;
  total: number;
  rent: RentEntity;
  extra: ExtraEntity;
}
