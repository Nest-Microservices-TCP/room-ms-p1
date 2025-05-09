import { IBaseRepository } from 'src/common/repository';
import { CreateExtraRequest } from 'src/grpc/rooms/extras.pb';
import { Extra } from 'src/extras/entity/extra.entity';

export interface IExtrasRepository
  extends IBaseRepository<Extra, CreateExtraRequest> {}
