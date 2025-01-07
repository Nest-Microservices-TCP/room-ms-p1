import { IRepository } from 'src/common/repository';
import { CreateExtraDto, UpdateExtraDto } from 'src/extras/dto/request';
import { Extra } from 'src/extras/entity/extra.entity';

export interface IExtrasRepository
  extends IRepository<Extra, CreateExtraDto, UpdateExtraDto> {}
