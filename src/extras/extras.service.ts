import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ExtrasRepository } from './repository/extras.repository';

import { HandleRpcExceptions } from 'src/common/decorators';
import { CreateExtraDto, UpdateExtraDto } from './dto/request';
import { ExtraResponseDto } from './dto/response';

@Injectable()
export class ExtrasService {
  constructor(private readonly extrasRepository: ExtrasRepository) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(ExtraResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<ExtraResponseDto[]> {
    const extras = await this.extrasRepository.findAll();

    return this.plainToInstanceDto(extras);
  }

  @HandleRpcExceptions()
  async findOne(extraId: string): Promise<ExtraResponseDto> {
    const extra = await this.extrasRepository.findOne(extraId);

    return this.plainToInstanceDto(extra);
  }

  @HandleRpcExceptions()
  async findByIds(extrasIds: string[]): Promise<ExtraResponseDto[]> {
    const extras = await this.extrasRepository.findByIds(extrasIds);

    return this.plainToInstanceDto(extras);
  }

  @HandleRpcExceptions()
  async save(request: CreateExtraDto): Promise<ExtraResponseDto> {
    const newExtra = await this.extrasRepository.save(request);

    return this.plainToInstanceDto(newExtra);
  }

  @HandleRpcExceptions()
  async update(request: UpdateExtraDto): Promise<ExtraResponseDto> {
    const { extraId, ...rest } = request;

    const updatedExtra = await this.extrasRepository.update({ extraId }, rest);

    return this.plainToInstanceDto(updatedExtra);
  }

  @HandleRpcExceptions()
  async remove(extraId: string): Promise<ExtraResponseDto> {
    const extra = await this.extrasRepository.remove(extraId);

    return plainToInstance(ExtraResponseDto, extra, {
      excludeExtraneousValues: true,
    });
  }
}
