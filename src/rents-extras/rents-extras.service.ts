import { RentsExtrasRepository } from './repository/rents-extras.repository';
import { CreateRentExtraDto, UpdateRentExtraDto } from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { HandleRpcExceptions } from 'src/common/decorators';
import { RentExtraResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RentsExtrasService {
  constructor(private readonly rentsExtrasRepository: RentsExtrasRepository) {}

  @HandleRpcExceptions()
  async findAll(): Promise<RentExtraResponseDto[]> {
    const rentsExtras = await this.rentsExtrasRepository.findAll();

    // TODO: Separar esta funcionalidad para que sea reutilizaba (decorador quizá)
    return plainToInstance(RentExtraResponseDto, rentsExtras, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOne(rentExtraId: string): Promise<RentExtraResponseDto> {
    const rentExtra = await this.rentsExtrasRepository.findOne(rentExtraId);

    return plainToInstance(RentExtraResponseDto, rentExtra, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findByIds(rentsExtrasIds: string[]): Promise<RentExtraResponseDto[]> {
    const rentsExtras =
      await this.rentsExtrasRepository.findByIds(rentsExtrasIds);

    return plainToInstance(RentExtraResponseDto, rentsExtras, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async save(request: CreateRentExtraDto): Promise<RentExtraResponseDto> {
    const newRentExtra = await this.rentsExtrasRepository.save(request);

    return plainToInstance(RentExtraResponseDto, newRentExtra, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(request: UpdateRentExtraDto): Promise<RentExtraResponseDto> {
    const updatedRentExtra = await this.rentsExtrasRepository.update(request);

    return plainToInstance(RentExtraResponseDto, updatedRentExtra, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async remove(rentExtraId: string): Promise<DeleteResultResponse> {
    const deleteResult = await this.rentsExtrasRepository.remove(rentExtraId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
