import { RentExtra } from 'src/rents-extras/entity/rent-extra.entity';
import { IBaseRepository } from 'src/common/interfaces';
import {
  CreateRentExtraDto,
  UpdateRentExtraDto,
} from 'src/rents-extras/dto/request';

export interface IRentsExtrasRepository
  extends IBaseRepository<RentExtra, CreateRentExtraDto, UpdateRentExtraDto> {}
