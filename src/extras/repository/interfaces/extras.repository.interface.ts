import { IRepository } from 'src/common/repository';
import { CreateExtraRequest } from 'src/grpc/proto/rooms/extras.pb';
import { Extra } from 'src/extras/entity/extra.entity';

export interface IExtrasRepository
  extends IRepository<Extra, CreateExtraRequest> {}
