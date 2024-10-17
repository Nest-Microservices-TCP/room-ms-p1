import { Injectable } from '@nestjs/common';
import { RentsRepository } from './repository/rents.repository';
import { RentEntity } from './entity';
import { HandleRpcExceptions } from 'src/common/decorators';

@Injectable()
export class RentsService {
  constructor(private readonly rentsRepository: RentsRepository) {}

  @HandleRpcExceptions()
  async findAll(): Promise<RentEntity[]> {
    return this.rentsRepository.findAll();
  }

  @HandleRpcExceptions()
  async findOneById(rentId: string): Promise<RentEntity> {
    return this.rentsRepository.findOneById(rentId);
  }
}
