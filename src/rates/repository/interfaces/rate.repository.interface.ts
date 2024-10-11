import { IBaseRepository } from 'src/common/interfaces';
import { CreateRateDto, UpdateRateDto } from 'src/rates/dto/request';
import { RateEntity } from 'src/rates/entity/rate.entity';

export interface IRatesRepository
  extends IBaseRepository<RateEntity, CreateRateDto, UpdateRateDto> {}
