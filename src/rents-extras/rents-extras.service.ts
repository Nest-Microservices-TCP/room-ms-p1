import { plainToInstance } from 'class-transformer';
import { RentExtraResponseDto } from './dto/response';
import { RentsExtrasRepository } from './repository/rents-extras.repository';
import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

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
  async findOneById(rentExtraId: string): Promise<RentExtraResponseDto> {
    const rentExtra = await this.rentsExtrasRepository.findOneById(rentExtraId);

    return plainToInstance(RentExtraResponseDto, rentExtra, {
      excludeExtraneousValues: true,
    });
  }
}
