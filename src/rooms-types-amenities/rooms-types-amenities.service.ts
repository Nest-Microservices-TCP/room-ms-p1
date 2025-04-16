import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { HandleRpcExceptions } from 'src/common/decorators';

import { RoomsTypesAmenitiesRepository } from './repository/rooms-types-amenities.repository';

import {
  CreateRoomTypeAmenityDto,
  UpdateRoomTypeAmenityDto,
} from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { RoomTypeAmenityResponseDto } from './dto/response/room-type-amenity.response.dto';

@Injectable()
export class RoomsTypesAmenitiesService {
  constructor(
    private readonly roomsTypesAmenitiesRepository: RoomsTypesAmenitiesRepository,
  ) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(RoomTypeAmenityResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async find(): Promise<RoomTypeAmenityResponseDto[]> {
    const roomsTypesAmenities = await this.roomsTypesAmenitiesRepository.find();

    return this.plainToInstanceDto(roomsTypesAmenities);
  }

  @HandleRpcExceptions()
  async findOne(
    roomTypeAmenityId: string,
  ): Promise<RoomTypeAmenityResponseDto> {
    const roomTypeAmenity =
      await this.roomsTypesAmenitiesRepository.findOne(roomTypeAmenityId);

    return this.plainToInstanceDto(roomTypeAmenity);
  }

  @HandleRpcExceptions()
  async save(
    request: CreateRoomTypeAmenityDto,
  ): Promise<RoomTypeAmenityResponseDto> {
    const newRoomTypeAmenity =
      await this.roomsTypesAmenitiesRepository.save(request);

    return this.plainToInstanceDto(newRoomTypeAmenity);
  }

  @HandleRpcExceptions()
  async update(
    request: UpdateRoomTypeAmenityDto,
  ): Promise<RoomTypeAmenityResponseDto> {
    const { roomTypeAmenityId, ...rest } = request;

    const updatedRoomTypeAmenity =
      await this.roomsTypesAmenitiesRepository.update(
        { roomTypeAmenityId },
        rest,
      );

    return this.plainToInstanceDto(updatedRoomTypeAmenity);
  }

  @HandleRpcExceptions()
  async remove(roomTypeAmenityId: string): Promise<DeleteResultResponse> {
    const deleteResult =
      await this.roomsTypesAmenitiesRepository.remove(roomTypeAmenityId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
