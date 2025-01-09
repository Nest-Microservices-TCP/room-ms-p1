/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import {
  CreateRoomTypeAmenityDto,
  UpdateRoomTypeAmenityDto,
} from '../dto/request';

import { DeleteResultResponse } from 'src/common/dto/response';
import { IRoomsTypesAmenities } from './interfaces/rooms-types-amenities.repository.interface';

import { RoomTypeAmenity } from '../entity/room-type-amenity.entity';
import { EntityNotFoundException } from 'src/common/exceptions/custom';

export class RoomsTypesAmenitiesRepository implements IRoomsTypesAmenities {
  private roomsTypesAmenitiesRepository: Repository<RoomTypeAmenity>;

  constructor(
    @InjectRepository(RoomTypeAmenity)
    private readonly defaultRepository: Repository<RoomTypeAmenity>,
  ) {}

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.roomsTypesAmenitiesRepository =
        queryRunner.manager.getRepository(RoomTypeAmenity);
    } else {
      this.roomsTypesAmenitiesRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<RoomTypeAmenity[]> {
    return this.roomsTypesAmenitiesRepository.find();
  }

  async findOne(roomTypeAmenityId: string): Promise<RoomTypeAmenity> {
    const roomTypeAmenity = await this.roomsTypesAmenitiesRepository.findOne({
      where: { roomTypeAmenityId },
    });

    if (!roomTypeAmenity) {
      throw new EntityNotFoundException('room-type-amenity');
    }

    return roomTypeAmenity;
  }
  create(request: Partial<RoomTypeAmenity>): RoomTypeAmenity {
    throw new Error('Method not implemented.');
  }
  save(request: CreateRoomTypeAmenityDto): Promise<RoomTypeAmenity> {
    throw new Error('Method not implemented.');
  }
  update(request: UpdateRoomTypeAmenityDto): Promise<RoomTypeAmenity> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<DeleteResultResponse> {
    throw new Error('Method not implemented.');
  }
}
