import { IBaseRepository } from 'src/common/interfaces';
import { CreateRentDto, UpdateRentDto } from 'src/rents/dto/request';
import { RentEntity } from 'src/rents/entity';

export interface IRentsRepository
  extends IBaseRepository<RentEntity, CreateRentDto, UpdateRentDto> {}
