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
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<ReservationState> {
    throw new Error('Method not implemented.');
  }
  create(request: Partial<ReservationState>): ReservationState {
    throw new Error('Method not implemented.');
  }
  save(request: CreateReservationStateDto): Promise<ReservationState> {
    throw new Error('Method not implemented.');
  }
  update(request: UpdateReservationStateDto): Promise<ReservationState> {
    throw new Error('Method not implemented.');
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
