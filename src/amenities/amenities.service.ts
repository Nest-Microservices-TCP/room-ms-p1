import { Injectable } from '@nestjs/common';
import { AmenitiesRepository } from './repository/amenities.repository';
import { AmenityResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { HandleRpcExceptions } from 'src/common/decorators';

@Injectable()
export class AmenitiesService {
  constructor(private readonly amenitiesRepository: AmenitiesRepository) {}

  @HandleRpcExceptions()
  async findAll(): Promise<AmenityResponseDto[]> {
    const amenities = await this.amenitiesRepository.findAll();

    return plainToInstance(AmenityResponseDto, amenities, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOneById(amenityId: string): Promise<AmenityResponseDto> {
    const amenity = await this.amenitiesRepository.findOneById(amenityId);

    return plainToInstance(AmenityResponseDto, amenity, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findByIds(amenitiesIds: string[]): Promise<AmenityResponseDto[]> {
    const amenities = await this.amenitiesRepository.findByIds(amenitiesIds);

    return plainToInstance(AmenityResponseDto, amenities, {
      excludeExtraneousValues: true,
    });
  }
}
