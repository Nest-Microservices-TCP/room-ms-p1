import { RentsRepository } from './repository/rents.repository';
import { CreateRentDto, UpdateRentDto } from './dto/request';
import { HandleRpcExceptions } from 'src/common/decorators';
import { plainToInstance } from 'class-transformer';
import { RentResponseDto } from './dto/response';
import { Injectable } from '@nestjs/common';
import { RentEntity } from './entity';

@Injectable()
export class RentsService {
  constructor(private readonly rentsRepository: RentsRepository) {}

  @HandleRpcExceptions()
  async findAll(): Promise<RentResponseDto[]> {
    const rents = await this.rentsRepository.findAll();

    return plainToInstance(RentResponseDto, rents, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOneById(rentId: string): Promise<RentResponseDto> {
    const rent = await this.rentsRepository.findOneById(rentId);

    return plainToInstance(RentResponseDto, rent, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findByIds(rentsIds: string[]): Promise<RentResponseDto[]> {
    const rents = await this.rentsRepository.findByIds(rentsIds);

    return plainToInstance(RentResponseDto, rents, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async save(request: CreateRentDto): Promise<RentResponseDto> {
    const rent = await this.rentsRepository.save(request);

    return plainToInstance(RentResponseDto, rent, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(request: UpdateRentDto): Promise<RentEntity> {
    return this.rentsRepository.update(request);
  }

  @HandleRpcExceptions()
  async remove(rentId: string): Promise<RentEntity> {
    return this.rentsRepository.remove(rentId);
  }
}
