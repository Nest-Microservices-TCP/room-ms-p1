/* eslint-disable @typescript-eslint/no-unused-vars */
import { IReservationsStatesRepository } from './interfaces/reservations-states.repository.interface';
import { ReservationState } from '../entity/reservation-state.entity';
import { DeleteResultResponse } from 'src/common/dto/response';
import { QueryRunner, FindOptionsWhere, Repository } from 'typeorm';
import {
  CreateReservationStateDto,
  UpdateReservationStateDto,
} from '../dto/request';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/common/exceptions/custom';

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

  remove(id: string): Promise<DeleteResultResponse> {
    throw new Error('Method not implemented.');
  }
  findByIds(ids: string[]): Promise<ReservationState[]> {
    throw new Error('Method not implemented.');
  }
  findByCriteria(
    criteria: FindOptionsWhere<ReservationState>,
  ): Promise<ReservationState> {
    throw new Error('Method not implemented.');
  }
  findWithRelations(relations: string[]): Promise<ReservationState[]> {
    throw new Error('Method not implemented.');
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
