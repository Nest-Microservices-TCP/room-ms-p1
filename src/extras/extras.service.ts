import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import {
  GetExtraRequest,
  ListExtrasResponse,
  CreateExtraRequest,
} from 'src/grpc/proto/rooms/extras.pb';

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
  async findAll(): Promise<ListExtrasResponse> {
    const extras = await this.extrasRepository.findAll();

    return { extras };
  }

  @HandleRpcExceptions()
  async findOne(request: GetExtraRequest): Promise<Extra> {
    const { extra_id } = request;

    return this.extrasRepository.findOne(extra_id);
  }
}
