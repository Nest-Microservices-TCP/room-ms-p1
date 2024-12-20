import { RentsRepository } from './repository/rents.repository';
import { CreateRentDto, UpdateRentDto } from './dto/request';
import { HandleRpcExceptions } from 'src/common/decorators';
import { plainToInstance } from 'class-transformer';
import { RentResponseDto } from './dto/response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RentsService {
  constructor(private readonly rentsRepository: RentsRepository) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(RentResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<RentResponseDto[]> {
    const rents = await this.rentsRepository.findAll();

    return plainToInstance(RentResponseDto, rents, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOne(rentId: string): Promise<RentResponseDto> {
    const rent = await this.rentsRepository.findOne(rentId);

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
  async update(request: UpdateRentDto): Promise<RentResponseDto> {
    const rent = await this.rentsRepository.update(request);

    return plainToInstance(RentResponseDto, rent, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async remove(rentId: string): Promise<RentResponseDto> {
    const rent = await this.rentsRepository.remove(rentId);

    return plainToInstance(RentResponseDto, rent, {
      excludeExtraneousValues: true,
    });
  }
}
