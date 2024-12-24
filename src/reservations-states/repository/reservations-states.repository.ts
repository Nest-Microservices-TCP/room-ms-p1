/* eslint-disable @typescript-eslint/no-unused-vars */
import { IReservationsStatesRepository } from './interfaces/reservations-states.repository.interface';
import { ReservationState } from '../entity/reservation-state.entity';
import { DeleteResultResponse } from 'src/common/dto/response';
import {
  QueryRunner,
  FindOptionsWhere,
  Repository,
  DeleteResult,
  In,
} from 'typeorm';
import {
  CreateReservationStateDto,
  UpdateReservationStateDto,
} from '../dto/request';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityNotFoundException,
  FailedRemoveException,
} from 'src/common/exceptions/custom';

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

  async update(request: UpdateReservationStateDto): Promise<ReservationState> {
    const { reservationStateId } = request;

    const reservationState = await this.findOne(reservationStateId);

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

  findByCriteria(
    criteria: FindOptionsWhere<ReservationState>,
  ): Promise<ReservationState> {
    return this.reservationsStatesRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<ReservationState[]> {
    return this.reservationsStatesRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<ReservationState>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  paginate(page: number, limit: number): Promise<[ReservationState[], number]> {
    throw new Error('Method not implemented.');
  }
  softDelete(id: string): Promise<ReservationState> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<ReservationState> {
    throw new Error('Method not implemented.');
  }
  exists(criteria: FindOptionsWhere<ReservationState>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  bulkSave(entities: ReservationState[]): Promise<ReservationState[]> {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(entities: ReservationState[]): Promise<ReservationState[]> {
    throw new Error('Method not implemented.');
  }
  customQuery(query: string, params: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
