/* eslint-disable @typescript-eslint/no-unused-vars */
import { IReservationsOriginsRepository } from './interfaces/reservations-origins.repository.interface';
import { ReservationOrigin } from '../entity/reservation-origin.entity';
import { DeleteResultResponse } from 'src/common/dto/response';
import {
  QueryRunner,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import {
  CreateReservationOriginDto,
  UpdateReservationOriginDto,
} from '../dto/request';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/common/exceptions/custom';

export class ReservationsOriginsRepository
  implements IReservationsOriginsRepository
{
  private reservationsOriginsRepository: Repository<ReservationOrigin>;

  constructor(
    @InjectRepository(ReservationOrigin)
    private readonly defaultRepository: Repository<ReservationOrigin>,
  ) {}

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.reservationsOriginsRepository =
        queryRunner.manager.getRepository(ReservationOrigin);
    } else {
      this.reservationsOriginsRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<ReservationOrigin[]> {
    return this.reservationsOriginsRepository.find();
  }

  async findOne(reservationOriginId: string): Promise<ReservationOrigin> {
    const reservationOrigin =
      await this.reservationsOriginsRepository.findOneBy({
        reservationOriginId,
      });

    if (!reservationOrigin) {
      throw new EntityNotFoundException('reservation-origin');
    }

    return reservationOrigin;
  }

  create(request: Partial<ReservationOrigin>): ReservationOrigin {
    return this.reservationsOriginsRepository.create(request);
  }

  save(request: CreateReservationOriginDto): Promise<ReservationOrigin> {
    return this.reservationsOriginsRepository.save(request);
  }

  async update(
    request: UpdateReservationOriginDto,
  ): Promise<ReservationOrigin> {
    const { reservationOriginId } = request;

    const reservationOrigin = await this.findOne(reservationOriginId);

    Object.assign(reservationOrigin, request);

    return this.reservationsOriginsRepository.save(reservationOrigin);
  }

  remove(id: string): Promise<DeleteResultResponse> {
    throw new Error('Method not implemented.');
  }
  findByIds(ids: string[]): Promise<ReservationOrigin[]> {
    throw new Error('Method not implemented.');
  }
  findByCriteria(
    criteria: FindOptionsWhere<ReservationOrigin>,
  ): Promise<ReservationOrigin> {
    throw new Error('Method not implemented.');
  }
  findWithRelations(relations: string[]): Promise<ReservationOrigin[]> {
    throw new Error('Method not implemented.');
  }
  count(criteria: FindOptionsWhere<ReservationOrigin>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  paginate(
    page: number,
    limit: number,
  ): Promise<[ReservationOrigin[], number]> {
    throw new Error('Method not implemented.');
  }
  softDelete(id: string): Promise<ReservationOrigin> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<ReservationOrigin> {
    throw new Error('Method not implemented.');
  }
  exists(criteria: FindOptionsWhere<ReservationOrigin>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  bulkSave(entities: ReservationOrigin[]): Promise<ReservationOrigin[]> {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(entities: ReservationOrigin[]): Promise<ReservationOrigin[]> {
    throw new Error('Method not implemented.');
  }
  customQuery(query: string, params: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
