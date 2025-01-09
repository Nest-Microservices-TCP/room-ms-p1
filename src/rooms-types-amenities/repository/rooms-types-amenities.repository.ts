import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, QueryRunner, Repository } from 'typeorm';

import {
  EntityNotFoundException,
  FailedRemoveException,
} from 'src/common/exceptions/custom';

import { DeleteResultResponse } from 'src/common/dto/response';
import {
  CreateRoomTypeAmenityDto,
  UpdateRoomTypeAmenityDto,
} from '../dto/request';

import { RoomTypeAmenity } from '../entity/room-type-amenity.entity';
import { IRoomsTypesAmenities } from './interfaces/rooms-types-amenities.repository.interface';

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
    return this.roomsTypesAmenitiesRepository.create(request);
  }

  save(request: CreateRoomTypeAmenityDto): Promise<RoomTypeAmenity> {
    return this.roomsTypesAmenitiesRepository.save(request);
  }

  async update(request: UpdateRoomTypeAmenityDto): Promise<RoomTypeAmenity> {
    const { roomTypeAmenityId } = request;

    const roomTypeAmenity = await this.findOne(roomTypeAmenityId);

    Object.assign(roomTypeAmenity, request);

    return this.roomsTypesAmenitiesRepository.save(roomTypeAmenity);
  }

  async remove(roomTypeAmenityId: string): Promise<DeleteResultResponse> {
    await this.findOne(roomTypeAmenityId);

    const result: DeleteResult =
      await this.roomsTypesAmenitiesRepository.delete(roomTypeAmenityId);

    if (result?.affected === 0) {
      throw new FailedRemoveException('room-type-amenity');
    }

    return { deleted: true, affected: result.affected };
  }
}
