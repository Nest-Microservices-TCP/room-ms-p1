import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOptionsWhere,
  QueryRunner,
  Repository,
} from 'typeorm';

import {
  EntityNotFoundException,
  FailedRemoveException,
} from 'src/common/exceptions/custom';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRoomTypeAmenityDto } from '../dto/request';

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

  find(): Promise<RoomTypeAmenity[]> {
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

  async update(
    conditions: FindOptionsWhere<RoomTypeAmenity>,
    request: Partial<RoomTypeAmenity>,
  ): Promise<RoomTypeAmenity> {
    const roomTypeAmenity = await this.roomsTypesAmenitiesRepository.findOne({
      where: conditions,
    });

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
