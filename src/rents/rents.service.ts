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

    return this.plainToInstanceDto(rents);
  }

  @HandleRpcExceptions()
  async findOne(rentId: string): Promise<RentResponseDto> {
    const rent = await this.rentsRepository.findOne(rentId);

    return this.plainToInstanceDto(rent);
  }

  @HandleRpcExceptions()
  async findByIds(rentsIds: string[]): Promise<RentResponseDto[]> {
    const rents = await this.rentsRepository.findByIds(rentsIds);

    return this.plainToInstanceDto(rents);
  }

  @HandleRpcExceptions()
  async save(request: CreateRentDto): Promise<RentResponseDto> {
    const newRent = await this.rentsRepository.save(request);

    return this.plainToInstanceDto(newRent);
  }

  @HandleRpcExceptions()
  async update(request: UpdateRentDto): Promise<RentResponseDto> {
    const updatedRent = await this.rentsRepository.update(request);

    return this.plainToInstanceDto(updatedRent);
  }

  @HandleRpcExceptions()
  async remove(rentId: string): Promise<RentResponseDto> {
    const rent = await this.rentsRepository.remove(rentId);

    return plainToInstance(RentResponseDto, rent, {
      excludeExtraneousValues: true,
    });
  }
}
