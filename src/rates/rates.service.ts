import { Injectable } from '@nestjs/common';

import {
  FindRatesResponse,
  CreateRateRequest,
  FindOneRateRequest,
  FindRatesByIdsRequest,
} from 'src/grpc/rooms/rates.pb';

import { RatesRepository } from './repository/rates.repository';

import { Rate } from './entity/rate.entity';

@Injectable()
export class RatesService {
  constructor(private readonly ratesRepository: RatesRepository) {}

  save(request: CreateRateRequest): void {
    this.ratesRepository.save(request);
  }

  async findOne(request: FindOneRateRequest): Promise<Rate> {
    const { rate_id } = request;

    return await this.ratesRepository.findOne(rate_id);
  }

  async find(): Promise<FindRatesResponse> {
    const rates = await this.ratesRepository.find();

    return { rates };
  }

  async findByIds(request: FindRatesByIdsRequest): Promise<FindRatesResponse> {
    const { rates_ids } = request;

    const rates = await this.ratesRepository.findByIds(rates_ids);

    return { rates };
  }
}
