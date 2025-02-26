import { IRepository } from 'src/common/repository';
import { Rate } from 'src/rates/entity/rate.entity';
import { CreateRateRequest } from 'src/grpc/rooms/rates/rates-request.pb';

export interface IRatesRepository
  extends IRepository<Rate, CreateRateRequest> {}
