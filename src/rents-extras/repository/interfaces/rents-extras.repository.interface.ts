import { IRepository } from 'src/common/repository';
import { CreateRentExtraDto } from 'src/rents-extras/dto/request';
import { RentExtra } from 'src/rents-extras/entity/rent-extra.entity';

export interface IRentsExtrasRepository
  extends IRepository<RentExtra, CreateRentExtraDto> {}
