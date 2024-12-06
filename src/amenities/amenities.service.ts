import { AmenitiesRepository } from './repository/amenities.repository';
import { CreateAmenityDto, UpdateAmenityDto } from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { HandleRpcExceptions } from 'src/common/decorators';
import { AmenityResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

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

  @HandleRpcExceptions()
  async save(request: CreateAmenityDto): Promise<AmenityResponseDto> {
    const newAmenity = await this.amenitiesRepository.save(request);

    return plainToInstance(AmenityResponseDto, newAmenity, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(request: UpdateAmenityDto): Promise<AmenityResponseDto> {
    const amenityUpdated = await this.amenitiesRepository.update(request);

    return plainToInstance(AmenityResponseDto, amenityUpdated, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async remove(amenityId: string): Promise<DeleteResultResponse> {
    const deleteResult = await this.amenitiesRepository.remove(amenityId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
