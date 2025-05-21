import { Extra } from 'src/grpc/rooms/extras.pb';
import { Rent } from 'src/rents/entity';

export class SaveRentExtraDto {
  quantity: number;
  total: number;
  rent: Rent;
  extra: Extra;
}
