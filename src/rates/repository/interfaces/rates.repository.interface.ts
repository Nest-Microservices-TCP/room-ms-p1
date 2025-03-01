import { IRepository } from 'src/common/repository';
import { CreateRateRequest } from 'src/grpc/proto/rooms/rates.pb';
import { Rate } from 'src/rates/entity/rate.entity';

export interface IRatesRepository
  extends IRepository<Rate, CreateRateRequest> {}
