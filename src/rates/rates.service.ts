import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import { RatesRepository } from './repository/rates.repository';

import {
  FindRatesResponse,
  CreateRateRequest,
  FindOneRateRequest,
} from 'src/grpc/proto/rooms/rates.pb';

import { Rate } from './entity/rate.entity';

@Injectable()
export class RatesService {
  constructor(private readonly ratesRepository: RatesRepository) {}

  @HandleRpcExceptions()
  save(request: CreateRateRequest): void {
    this.ratesRepository.save(request);
  }

  @HandleRpcExceptions()
  async findOne(request: FindOneRateRequest): Promise<Rate> {
    const { rate_id } = request;

    return await this.ratesRepository.findOne(rate_id);
  }

  @HandleRpcExceptions()
  async find(): Promise<FindRatesResponse> {
    const rates = await this.ratesRepository.findAll();

    return { rates };
  }
}
