import { BaseEntity } from 'src/common/entity';

export class Amenity extends BaseEntity {
  amenity_id: string;
  name: string;
  quantity: number;
  description: string;
}
