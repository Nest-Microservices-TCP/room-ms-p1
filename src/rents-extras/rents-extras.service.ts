import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { HandleRpcExceptions } from 'src/common/decorators';

import {
  SaveRentExtraDto,
  UpdateRentExtraDto,
  CreateRentExtraDto,
  SaveManyRentsExtrasDto,
} from './dto/request';
import { RentExtraResponseDto } from './dto/response';
import { DeleteResultResponse } from 'src/common/dto/response';

import { RatesExtrasService } from 'src/rates-extras/rates-extras.service';
import { RentsExtrasRepository } from './repository/rents-extras.repository';

import { RentExtra } from './entity/rent-extra.entity';

@Injectable()
export class RentsExtrasService {
  constructor(
    private readonly rentsExtrasRepository: RentsExtrasRepository,
    private readonly ratesExtrasService: RatesExtrasService,
  ) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(RentExtraResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  async createMany(request: {
    rents_extras: CreateRentExtraDto[];
    rate_id: string;
  }) {
    const { rate_id, rents_extras } = request;

    if (rents_extras.length === 0) return;

    const extrasIds = rents_extras.map((rentExtra) => rentExtra.extra_id);

    const rateExtras = await this.ratesExtrasService.findByRate({
      extras_ids: extrasIds,
      rate_id,
    });

    console.log({ rateExtras });
  }

  @HandleRpcExceptions()
  async find(): Promise<RentExtraResponseDto[]> {
    const rentsExtras = await this.rentsExtrasRepository.find();

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
  async save(request: SaveRentExtraDto): Promise<RentExtraResponseDto> {
    const newRentExtra = await this.rentsExtrasRepository.save(request);

    return this.plainToInstanceDto(newRentExtra);
  }

  @HandleRpcExceptions()
  async bulkSave(request: SaveManyRentsExtrasDto): Promise<RentExtra[]> {
    return this.rentsExtrasRepository.bulkSave(request);
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
