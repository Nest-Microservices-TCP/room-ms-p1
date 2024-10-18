import { Injectable } from '@nestjs/common';
import { RentsRepository } from './repository/rents.repository';
import { RentEntity } from './entity';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CreateRentDto, UpdateRentDto } from './dto/request';

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

  @HandleRpcExceptions()
  async save(request: CreateRentDto): Promise<RentEntity> {
    return this.rentsRepository.save(request);
  }

  @HandleRpcExceptions()
  async update(request: UpdateRentDto): Promise<RentEntity> {
    return this.rentsRepository.update(request);
  }
}
