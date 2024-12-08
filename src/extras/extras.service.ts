import { ExtrasRepository } from './repository/extras.repository';
import { CreateExtraDto, UpdateExtraDto } from './dto/request';
import { HandleRpcExceptions } from 'src/common/decorators';
import { plainToInstance } from 'class-transformer';
import { ExtraResponseDto } from './dto/response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExtrasService {
  constructor(private readonly extrasRepository: ExtrasRepository) {}

  @HandleRpcExceptions()
  async findAll(): Promise<ExtraResponseDto[]> {
    const extras = await this.extrasRepository.findAll();

    return plainToInstance(ExtraResponseDto, extras, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOne(extraId: string): Promise<ExtraResponseDto> {
    const extra = await this.extrasRepository.findOne(extraId);

    return plainToInstance(ExtraResponseDto, extra, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findByIds(extrasIds: string[]): Promise<ExtraResponseDto[]> {
    const extras = await this.extrasRepository.findByIds(extrasIds);

    return plainToInstance(ExtraResponseDto, extras, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async save(request: CreateExtraDto): Promise<ExtraResponseDto> {
    const extra = await this.extrasRepository.save(request);

    return plainToInstance(ExtraResponseDto, extra, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(request: UpdateExtraDto): Promise<ExtraResponseDto> {
    const extra = await this.extrasRepository.update(request);

    return plainToInstance(ExtraResponseDto, extra, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async remove(extraId: string): Promise<ExtraResponseDto> {
    const extra = await this.extrasRepository.remove(extraId);

    return plainToInstance(ExtraResponseDto, extra, {
      excludeExtraneousValues: true,
    });
  }
}
