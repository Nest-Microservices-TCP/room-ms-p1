import { CreateExtraDto, UpdateExtraDto } from 'src/extras/dto/request';
import { IBaseRepository } from 'src/common/interfaces';
import { Extra } from 'src/extras/entity/extra.entity';

export interface IExtrasRepository
  extends IBaseRepository<Extra, CreateExtraDto, UpdateExtraDto> {}
