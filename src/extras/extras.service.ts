import { Injectable } from '@nestjs/common';
import { ExtrasRepository } from './repository/extras.repository';
import { ExtraResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { HandleRpcExceptions } from 'src/common/decorators';

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
}
