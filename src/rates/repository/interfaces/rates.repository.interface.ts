import { IBaseRepository } from 'src/common/interfaces';
import { RateEntity } from 'src/rates/entity/rate.entity';
import { CreateRateDto, UpdateRateDto } from 'src/rates/dto/request';

export interface IRatesRepository
  extends IBaseRepository<RateEntity, CreateRateDto, UpdateRateDto> {}
