import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { HandleRpcExceptions } from 'src/common/decorators';

import { AmenitiesRepository } from './repository/amenities.repository';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateAmenityDto, UpdateAmenityDto } from './dto/request';
import { AmenityResponseDto } from './dto/response';

@Injectable()
export class AmenitiesService {
  constructor(private readonly amenitiesRepository: AmenitiesRepository) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(AmenityResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<AmenityResponseDto[]> {
    const amenities = await this.amenitiesRepository.findAll();

    return this.plainToInstanceDto(amenities);
  }

  @HandleRpcExceptions()
  async findOne(amenityId: string): Promise<AmenityResponseDto> {
    const amenity = await this.amenitiesRepository.findOne(amenityId);

    return this.plainToInstanceDto(amenity);
  }

  @HandleRpcExceptions()
  async findByIds(amenitiesIds: string[]): Promise<AmenityResponseDto[]> {
    const amenities = await this.amenitiesRepository.findByIds(amenitiesIds);

    return this.plainToInstanceDto(amenities);
  }

  @HandleRpcExceptions()
  async save(request: CreateAmenityDto): Promise<AmenityResponseDto> {
    const newAmenity = await this.amenitiesRepository.save(request);

    return this.plainToInstanceDto(newAmenity);
  }

  @HandleRpcExceptions()
  async update(request: UpdateAmenityDto): Promise<AmenityResponseDto> {
    const { amenityId, ...rest } = request;

    const updatedAmenity = await this.amenitiesRepository.update(
      { amenityId },
      rest,
    );

    return this.plainToInstanceDto(updatedAmenity);
  }

  @HandleRpcExceptions()
  async remove(amenityId: string): Promise<DeleteResultResponse> {
    const deleteResult = await this.amenitiesRepository.remove(amenityId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
