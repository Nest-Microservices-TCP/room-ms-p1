import { IBaseRepository } from 'src/common/repository';
import { CreateRateRequest } from 'src/grpc/rooms/rates.pb';
import { Rate } from 'src/rates/entity/rate.entity';

export interface IRatesRepository
  extends IBaseRepository<Rate, CreateRateRequest> {}
