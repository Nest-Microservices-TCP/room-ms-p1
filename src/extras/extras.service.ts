import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import {
  FindExtrasResponse,
  CreateExtraRequest,
  FindOneExtraRequest,
  FindExtrasByIdsRequest,
} from 'src/grpc/rooms/extras.pb';

import { ExtrasRepository } from './repository/extras.repository';

import { Extra } from './entity/extra.entity';

@Injectable()
export class ExtrasService {
  constructor(private readonly extrasRepository: ExtrasRepository) {}

  @HandleRpcExceptions()
  save(request: CreateExtraRequest): void {
    this.extrasRepository.save(request);
  }

  @HandleRpcExceptions()
  async find(): Promise<FindExtrasResponse> {
    const extras = await this.extrasRepository.find();

    return { extras };
  }

  @HandleRpcExceptions()
  async findOne(request: FindOneExtraRequest): Promise<Extra> {
    const { extra_id } = request;

    return this.extrasRepository.findOne(extra_id);
  }

  @HandleRpcExceptions()
  async findByIds(
    request: FindExtrasByIdsRequest,
  ): Promise<FindExtrasResponse> {
    const { extras_ids } = request;

    const extras = await this.extrasRepository.findByIds(extras_ids);

    return { extras };
  }
}
