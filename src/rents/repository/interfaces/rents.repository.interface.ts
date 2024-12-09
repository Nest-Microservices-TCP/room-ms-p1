import { CreateRentDto, UpdateRentDto } from 'src/rents/dto/request';
import { IBaseRepository } from 'src/common/interfaces';
import { Rent } from 'src/rents/entity';

export interface IRentsRepository
  extends IBaseRepository<Rent, CreateRentDto, UpdateRentDto> {}
