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

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateReservationStateDto } from '../dto/request';

import { Status } from 'src/common/enums';
import { ReservationState } from '../entity/reservation-state.entity';

import { IReservationsStatesRepository } from './interfaces/reservations-states.repository.interface';

export class ReservationsStatesRepository
  implements IReservationsStatesRepository
{
  private reservationsStatesRepository: Repository<ReservationState>;

  constructor(
    @InjectRepository(ReservationState)
    private readonly defaultRepository: Repository<ReservationState>,
  ) {}

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.reservationsStatesRepository =
        queryRunner.manager.getRepository(ReservationState);
    } else {
      this.reservationsStatesRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<ReservationState[]> {
    return this.reservationsStatesRepository.find();
  }

  async findOne(reservationStateId: string): Promise<ReservationState> {
    const reservationState = await this.reservationsStatesRepository.findOne({
      where: { reservationStateId },
    });

    if (!reservationState) {
      throw new EntityNotFoundException('reservation-state');
    }

    return reservationState;
  }

  create(request: Partial<ReservationState>): ReservationState {
    return this.reservationsStatesRepository.create(request);
  }

  save(request: CreateReservationStateDto): Promise<ReservationState> {
    return this.reservationsStatesRepository.save(request);
  }

  async update(
    conditions: FindOptionsWhere<ReservationState>,
    request: Partial<ReservationState>,
  ): Promise<ReservationState> {
    const reservationState = await this.findByCriteria(conditions);

    Object.assign(reservationState, request);

    return this.reservationsStatesRepository.save(reservationState);
  }

  async remove(reservationStateId: string): Promise<DeleteResultResponse> {
    await this.findOne(reservationStateId);

    const result: DeleteResult =
      await this.reservationsStatesRepository.delete(reservationStateId);

    if (result?.affected === 0) {
      throw new FailedRemoveException('reservation-state');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(reservationsStatesIds: string[]): Promise<ReservationState[]> {
    return this.reservationsStatesRepository.find({
      where: { reservationStateId: In(reservationsStatesIds) },
    });
  }

  async findByCriteria(
    criteria: FindOptionsWhere<ReservationState>,
  ): Promise<ReservationState> {
    const reservationState = await this.reservationsStatesRepository.findOne({
      where: criteria,
    });

    if (!reservationState) {
      throw new EntityNotFoundException('reservation-state');
    }

    return reservationState;
  }

  findWithRelations(relations: string[]): Promise<ReservationState[]> {
    return this.reservationsStatesRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<ReservationState>): Promise<number> {
    return this.reservationsStatesRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[ReservationState[], number]> {
    return this.reservationsStatesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async softDelete(reservationStateId: string): Promise<ReservationState> {
    await this.findOne(reservationStateId);

    const result: UpdateResult = await this.reservationsStatesRepository.update(
      reservationStateId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('reservation-state');
    }

    return this.findOne(reservationStateId);
  }

  async restore(reservationStateId: string): Promise<ReservationState> {
    await this.findOne(reservationStateId);

    const result: UpdateResult = await this.reservationsStatesRepository.update(
      reservationStateId,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('reservation-state');
    }

    return this.findOne(reservationStateId);
  }

  async exists(criteria: FindOptionsWhere<ReservationState>): Promise<boolean> {
    const count = await this.reservationsStatesRepository.count({
      where: criteria,
    });

    return count > 0;
  }

  bulkSave(
    reservationsStates: ReservationState[],
  ): Promise<ReservationState[]> {
    return this.reservationsStatesRepository.save(reservationsStates);
  }

  bulkUpdate(
    reservationsStates: ReservationState[],
  ): Promise<ReservationState[]> {
    return this.reservationsStatesRepository.save(reservationsStates);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.reservationsStatesRepository.query(query, params);
  }
}
