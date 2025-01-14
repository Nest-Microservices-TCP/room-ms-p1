import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { HandleRpcExceptions } from 'src/common/decorators';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRentExtraDto, UpdateRentExtraDto } from './dto/request';
import { RentExtraResponseDto } from './dto/response';

import { RentsExtrasRepository } from './repository/rents-extras.repository';

@Injectable()
export class RentsExtrasService {
  constructor(private readonly rentsExtrasRepository: RentsExtrasRepository) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(RentExtraResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<RentExtraResponseDto[]> {
    const rentsExtras = await this.rentsExtrasRepository.findAll();

    return this.plainToInstanceDto(rentsExtras);
  }

  @HandleRpcExceptions()
  async findOne(rentExtraId: string): Promise<RentExtraResponseDto> {
    const rentExtra = await this.rentsExtrasRepository.findOne(rentExtraId);

    return this.plainToInstanceDto(rentExtra);
  }

  @HandleRpcExceptions()
  async findByIds(rentsExtrasIds: string[]): Promise<RentExtraResponseDto[]> {
    const rentsExtras =
      await this.rentsExtrasRepository.findByIds(rentsExtrasIds);

    return this.plainToInstanceDto(rentsExtras);
  }

  @HandleRpcExceptions()
  async save(request: CreateRentExtraDto): Promise<RentExtraResponseDto> {
    const newRentExtra = await this.rentsExtrasRepository.save(request);

    return this.plainToInstanceDto(newRentExtra);
  }

  @HandleRpcExceptions()
  async update(request: UpdateRentExtraDto): Promise<RentExtraResponseDto> {
    const { rentExtraId, ...rest } = request;

    const updatedRentExtra = await this.rentsExtrasRepository.update(
      { rentExtraId },
      rest,
    );

    return this.plainToInstanceDto(updatedRentExtra);
  }

  @HandleRpcExceptions()
  async remove(rentExtraId: string): Promise<DeleteResultResponse> {
    const deleteResult = await this.rentsExtrasRepository.remove(rentExtraId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
