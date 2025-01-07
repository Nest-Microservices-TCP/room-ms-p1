import { IRepository } from 'src/common/repository';
import { CreateRateDto, UpdateRateDto } from 'src/rates/dto/request';
import { Rate } from 'src/rates/entity/rate.entity';

export interface IRatesRepository
  extends IRepository<Rate, CreateRateDto, UpdateRateDto> {}
