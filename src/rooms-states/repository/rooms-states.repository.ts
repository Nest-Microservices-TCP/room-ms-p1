import {
  In,
  Repository,
  QueryRunner,
  DeleteResult,
  UpdateResult,
  FindOptionsWhere,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';

import {
  FailedRemoveException,
  FailedRestoreException,
  EntityNotFoundException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

import { CreateRoomStateRequest } from 'src/grpc/rooms/rooms_states.pb';

import { IRoomsStateRepository } from './interfaces/rooms-states.repository.interface';

import { Status } from 'src/common/enums';
import { RoomState } from '../entity/room-state.entity';

import { DeleteResultResponse } from 'src/common/dto/response';

@Injectable()
export class RoomsStatesRepository implements IRoomsStateRepository {
  private roomsStatesRepository: Repository<RoomState>;

  constructor(
    @InjectRepository(RoomState)
    private readonly defaultRepository: Repository<RoomState>,
  ) {
    this.roomsStatesRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.roomsStatesRepository = queryRunner.manager.getRepository(RoomState);
    } else {
      this.roomsStatesRepository = this.defaultRepository;
    }
  }

  async findOne(room_state_id: string): Promise<RoomState> {
    const roomState = await this.roomsStatesRepository.findOne({
      where: { room_state_id },
    });

    if (!roomState) {
      throw new EntityNotFoundException('room-state');
    }

    return roomState;
  }

  find(): Promise<RoomState[]> {
    return this.roomsStatesRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  create(request: Partial<RoomState>): RoomState {
    return this.roomsStatesRepository.create(request);
  }

  async save(request: CreateRoomStateRequest): Promise<RoomState> {
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

  async update(
    conditions: FindOptionsWhere<RoomState>,
    request: Partial<RoomState>,
  ): Promise<RoomState> {
    const roomState = await this.findByCriteria(conditions);

    Object.assign(roomState, request);

    return this.roomsStatesRepository.save(roomState);
  }

  async remove(roomStateId: string): Promise<DeleteResultResponse> {
    await this.findOne(roomStateId);

    const result: DeleteResult =
      await this.roomsStatesRepository.delete(roomStateId);

    if (result.affected === 0) {
      throw new FailedRemoveException('room-state');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(rooms_states_ids: string[]): Promise<RoomState[]> {
    return this.roomsStatesRepository.find({
      where: {
        room_state_id: In(rooms_states_ids),
      },
    });
  }

  async findByCriteria(
    criteria: FindOptionsWhere<RoomState>,
  ): Promise<RoomState> {
    const roomState = await this.roomsStatesRepository.findOne({
      where: criteria,
    });

    if (!roomState) {
      throw new EntityNotFoundException('room-state');
    }

    return roomState;
  }

  findWithRelations(relations: string[]): Promise<RoomState[]> {
    return this.roomsStatesRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<RoomState>): Promise<number> {
    return this.roomsStatesRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[RoomState[], number]> {
    return this.roomsStatesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<RoomState>): Promise<boolean> {
    const count = await this.roomsStatesRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(roomStateId: string): Promise<RoomState> {
    await this.findOne(roomStateId);

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

    return this.findOne(roomStateId);
  }

  async restore(roomStateId: string): Promise<RoomState> {
    await this.findOne(roomStateId);

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

    return this.findOne(roomStateId);
  }

  bulkSave(roomsStates: RoomState[]): Promise<RoomState[]> {
    return this.roomsStatesRepository.save(roomsStates);
  }

  bulkUpdate(roomsStates: RoomState[]): Promise<RoomState[]> {
    return this.roomsStatesRepository.save(roomsStates);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.roomsStatesRepository.query(query, params);
  }
}
