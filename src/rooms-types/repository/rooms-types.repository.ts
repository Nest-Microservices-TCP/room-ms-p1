import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityNotFoundException,
  FailedRemoveException,
  FailedRestoreException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';
import {
  DeleteResult,
  FindOptionsWhere,
  In,
  QueryRunner,
  Repository,
  UpdateResult,
} from 'typeorm';

import { Status } from 'src/common/enums';
import { RoomType } from '../entity/room-type.entity';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRoomTypeDto } from '../dto/request';

import { IRoomsTypesRepository } from './interfaces/rooms-types.repository.interface';

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

  findAll(): Promise<RoomType[]> {
    return this.roomsTypesRepository.find();
  }

  async findOne(roomTypeId: string): Promise<RoomType> {
    const roomType = await this.roomsTypesRepository.findOne({
      where: { roomTypeId },
    });

    if (!roomType) {
      throw new EntityNotFoundException('room-type');
    }

    return roomType;
  }

  create(request: Partial<RoomType>): RoomType {
    return this.roomsTypesRepository.create(request);
  }

  save(request: CreateRoomTypeDto): Promise<RoomType> {
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

  findByIds(roomsTypesIds: string[]): Promise<RoomType[]> {
    return this.roomsTypesRepository.find({
      where: {
        roomTypeId: In(roomsTypesIds),
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
