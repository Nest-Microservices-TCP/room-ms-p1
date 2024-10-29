/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityNotFoundException } from 'src/common/exceptions/custom/entity-not-found.exception';
import { IRoomsStateRepository } from './interfaces/rooms-states.repository.interface';
import { UpdateRoomStateDto, CreateRoomStateDto } from '../dto/request';
import { ConflictException, Injectable } from '@nestjs/common';
import { RoomStateEntity } from '../entity/room-state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import {
  In,
  Repository,
  QueryRunner,
  UpdateResult,
  DeleteResult,
  FindOptionsWhere,
} from 'typeorm';
import {
  FailedRemoveException,
  FailedRestoreException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

@Injectable()
export class RoomsStatesRepository implements IRoomsStateRepository {
  private roomsStatesRepository: Repository<RoomStateEntity>;

  constructor(
    @InjectRepository(RoomStateEntity)
    private readonly defaultRepository: Repository<RoomStateEntity>,
  ) {
    this.roomsStatesRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.roomsStatesRepository =
        queryRunner.manager.getRepository(RoomStateEntity);
    } else {
      this.roomsStatesRepository = this.defaultRepository;
    }
  }

  async findOneById(roomStateId: string): Promise<RoomStateEntity> {
    const roomState = await this.roomsStatesRepository.findOne({
      where: { roomStateId },
    });

    if (!roomState) {
      throw new EntityNotFoundException('room-state');
    }

    return roomState;
  }

  findAll(): Promise<RoomStateEntity[]> {
    return this.roomsStatesRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  create(request: Partial<RoomStateEntity>): RoomStateEntity {
    return this.roomsStatesRepository.create(request);
  }

  async save(request: CreateRoomStateDto): Promise<RoomStateEntity> {
    const { name } = request;

    const roomState = await this.roomsStatesRepository.findOne({
      where: {
        name,
      },
    });

    if (roomState) {
      throw new ConflictException(
        `Already exists a room state with name: ${name}`,
      );
    }

    return this.roomsStatesRepository.save(request);
  }

  async update(request: UpdateRoomStateDto): Promise<RoomStateEntity> {
    const { roomStateId } = request;

    const roomState = await this.findOneById(roomStateId);

    Object.assign(roomState, request);

    return this.roomsStatesRepository.save(roomState);
  }

  async remove(roomStateId: string): Promise<RoomStateEntity> {
    const roomState = await this.findOneById(roomStateId);

    const result: DeleteResult =
      await this.roomsStatesRepository.delete(roomStateId);

    if (result.affected === 0) {
      throw new FailedRemoveException('room-state');
    }

    return roomState;
  }

  findByIds(roomsStatesIds: string[]): Promise<RoomStateEntity[]> {
    return this.roomsStatesRepository.find({
      where: {
        roomStateId: In(roomsStatesIds),
      },
    });
  }

  findByCriteria(
    criteria: FindOptionsWhere<RoomStateEntity>,
  ): Promise<RoomStateEntity> {
    return this.roomsStatesRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<RoomStateEntity[]> {
    return this.roomsStatesRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<RoomStateEntity>): Promise<number> {
    return this.roomsStatesRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[RoomStateEntity[], number]> {
    return this.roomsStatesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<RoomStateEntity>): Promise<boolean> {
    const count = await this.roomsStatesRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(roomStateId: string): Promise<RoomStateEntity> {
    await this.findOneById(roomStateId);

    const result: UpdateResult = await this.roomsStatesRepository.update(
      roomStateId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('room-state');
    }

    return this.findOneById(roomStateId);
  }

  async restore(roomStateId: string): Promise<RoomStateEntity> {
    await this.findOneById(roomStateId);

    const result: UpdateResult = await this.roomsStatesRepository.update(
      roomStateId,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('room-state');
    }

    return this.findOneById(roomStateId);
  }

  bulkSave(roomsStates: RoomStateEntity[]): Promise<RoomStateEntity[]> {
    return this.roomsStatesRepository.save(roomsStates);
  }

  bulkUpdate(roomsStates: RoomStateEntity[]): Promise<RoomStateEntity[]> {
    return this.roomsStatesRepository.save(roomsStates);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.roomsStatesRepository.query(query, params);
  }
}
