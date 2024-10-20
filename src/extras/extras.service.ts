import { Injectable } from '@nestjs/common';
import { ExtrasRepository } from './repository/extras.repository';
import { ExtraResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CreateExtraDto, UpdateExtraDto } from './dto/request';

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
  async findOneById(extraId: string): Promise<ExtraResponseDto> {
    const extra = await this.extrasRepository.findOneById(extraId);

    return plainToInstance(ExtraResponseDto, extra, {
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
  async deleteById(extraId: string): Promise<ExtraResponseDto> {
    const extra = await this.extrasRepository.deleteById(extraId);

    return plainToInstance(ExtraResponseDto, extra, {
      excludeExtraneousValues: true,
    });
  }
}
