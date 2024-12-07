import { CreateRateDto, UpdateRateDto } from 'src/rates/dto/request';
import { IBaseRepository } from 'src/common/interfaces';
import { Rate } from 'src/rates/entity/rate.entity';

export interface IRatesRepository
  extends IBaseRepository<Rate, CreateRateDto, UpdateRateDto> {}
