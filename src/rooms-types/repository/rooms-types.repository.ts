import {
  In,
  Repository,
  QueryRunner,
  UpdateResult,
  DeleteResult,
  FindOptionsWhere,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  FailedRemoveException,
  FailedRestoreException,
  EntityNotFoundException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

import { CreateRoomTypeRequest } from 'src/grpc/proto-files/rooms/rooms_types.pb';

import { IRoomsTypesRepository } from './interfaces/rooms-types.repository.interface';

import { Status } from 'src/common/enums';
import { RoomType } from '../entity/room-type.entity';

import { DeleteResultResponse } from 'src/common/dto/response';

export class RoomsTypesRepository implements IRoomsTypesRepository {
  private roomsTypesRepository: Repository<RoomType>;

  constructor(
    @InjectRepository(RoomType)
    private readonly defaultRepository: Repository<RoomType>,
  ) {}

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.roomsTypesRepository = queryRunner.manager.getRepository(RoomType);
    } else {
      this.roomsTypesRepository = this.defaultRepository;
    }
  }

  find(): Promise<RoomType[]> {
    return this.roomsTypesRepository.find();
  }

  async findOne(room_type_id: string): Promise<RoomType> {
    const roomType = await this.roomsTypesRepository.findOne({
      where: { room_type_id },
    });

    if (!roomType) {
      throw new EntityNotFoundException('room-type');
    }

    return roomType;
  }

  create(request: Partial<RoomType>): RoomType {
    return this.roomsTypesRepository.create(request);
  }

  save(request: CreateRoomTypeRequest): Promise<RoomType> {
    return this.roomsTypesRepository.save(request);
  }

  async update(
    conditions: FindOptionsWhere<RoomType>,
    request: Partial<RoomType>,
  ): Promise<RoomType> {
    const roomType = await this.findByCriteria(conditions);

    Object.assign(roomType, request);

    return this.roomsTypesRepository.save(roomType);
  }

  async remove(roomTypeId: string): Promise<DeleteResultResponse> {
    await this.findOne(roomTypeId);

    const result: DeleteResult =
      await this.roomsTypesRepository.delete(roomTypeId);

    if (result?.affected === 0) {
      throw new FailedRemoveException('room-type');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(rooms_types_ids: string[]): Promise<RoomType[]> {
    return this.roomsTypesRepository.find({
      where: {
        room_type_id: In(rooms_types_ids),
      },
    });
  }

  async findByCriteria(
    criteria: FindOptionsWhere<RoomType>,
  ): Promise<RoomType> {
    const roomType = await this.roomsTypesRepository.findOne({
      where: criteria,
    });

    if (!roomType) {
      throw new EntityNotFoundException('room-type');
    }

    return roomType;
  }

  findWithRelations(relations: string[]): Promise<RoomType[]> {
    return this.roomsTypesRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<RoomType>): Promise<number> {
    return this.roomsTypesRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[RoomType[], number]> {
    return this.roomsTypesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async softDelete(roomTypeId: string): Promise<RoomType> {
    await this.findOne(roomTypeId);

    const result: UpdateResult = await this.roomsTypesRepository.update(
      roomTypeId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('room-type');
    }

    return this.findOne(roomTypeId);
  }

  async restore(roomTypeId: string): Promise<RoomType> {
    await this.findOne(roomTypeId);

    const result: UpdateResult = await this.roomsTypesRepository.update(
      roomTypeId,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('room-type');
    }

    return this.findOne(roomTypeId);
  }

  async exists(criteria: FindOptionsWhere<RoomType>): Promise<boolean> {
    const count = await this.roomsTypesRepository.count({ where: criteria });

    return count > 0;
  }

  bulkSave(roomsTypes: RoomType[]): Promise<RoomType[]> {
    return this.roomsTypesRepository.save(roomsTypes);
  }

  bulkUpdate(roomsTypes: RoomType[]): Promise<RoomType[]> {
    return this.roomsTypesRepository.save(roomsTypes);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.roomsTypesRepository.query(query, params);
  }
}
