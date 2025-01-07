import { IRepository } from 'src/common/repository';
import { CreateRentDto, UpdateRentDto } from 'src/rents/dto/request';
import { Rent } from 'src/rents/entity';

export interface IRentsRepository
  extends IRepository<Rent, CreateRentDto, UpdateRentDto> {}
