import { IBaseRepository } from 'src/common/repository';
import { Rent } from 'src/rents/entity';

export class CreateRentDto {}

export interface IRentsRepository
  extends IBaseRepository<Rent, CreateRentDto> {}
