import { IBaseRepository } from 'src/common/interfaces';
import { ExtraEntity } from 'src/extras/entity/extra.entity';
import { CreateExtraDto, UpdateExtraDto } from 'src/extras/dto/request';

export interface IExtrasRepository
  extends IBaseRepository<ExtraEntity, CreateExtraDto, UpdateExtraDto> {}
