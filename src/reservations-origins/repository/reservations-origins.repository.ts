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

import { CreateReservationStateRequest } from 'src/grpc/proto-files/rooms/reservations_states.pb';

import { IReservationsOriginsRepository } from './interfaces/reservations-origins.repository.interface';

import { Status } from 'src/common/enums';
import { ReservationOrigin } from '../entity/reservation-origin.entity';

import { DeleteResultResponse } from 'src/common/dto/response';

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

  find(): Promise<ReservationOrigin[]> {
    return this.reservationsOriginsRepository.find();
  }

  async findOne(reservation_origin_id: string): Promise<ReservationOrigin> {
    const reservationOrigin =
      await this.reservationsOriginsRepository.findOneBy({
        reservation_origin_id,
      });

    if (!reservationOrigin) {
      throw new EntityNotFoundException('reservation-origin');
    }

    return reservationOrigin;
  }

  create(request: Partial<ReservationOrigin>): ReservationOrigin {
    return this.reservationsOriginsRepository.create(request);
  }

  save(request: CreateReservationStateRequest): Promise<ReservationOrigin> {
    return this.reservationsOriginsRepository.save(request);
  }

  async update(
    conditions: FindOptionsWhere<ReservationOrigin>,
    request: Partial<ReservationOrigin>,
  ): Promise<ReservationOrigin> {
    const reservationOrigin = await this.findByCriteria(conditions);

    Object.assign(reservationOrigin, request);

    return this.reservationsOriginsRepository.save(reservationOrigin);
  }

  async remove(
    reservations_origins_ids: string,
  ): Promise<DeleteResultResponse> {
    await this.findOne(reservations_origins_ids);

    const result: DeleteResult =
      await this.reservationsOriginsRepository.delete(reservations_origins_ids);

    if (result?.affected === 0) {
      throw new FailedRemoveException('reservation-origin');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(reservationsOriginsIds: string[]): Promise<ReservationOrigin[]> {
    return this.reservationsOriginsRepository.find({
      where: {
        reservation_origin_id: In(reservationsOriginsIds),
      },
    });
  }

  async findByCriteria(
    criteria: FindOptionsWhere<ReservationOrigin>,
  ): Promise<ReservationOrigin> {
    const reservationOrigin = await this.reservationsOriginsRepository.findOne({
      where: criteria,
    });

    if (!reservationOrigin) {
      throw new EntityNotFoundException('reservation-origin');
    }

    return reservationOrigin;
  }

  findWithRelations(relations: string[]): Promise<ReservationOrigin[]> {
    return this.reservationsOriginsRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<ReservationOrigin>): Promise<number> {
    return this.reservationsOriginsRepository.count({ where: criteria });
  }

  paginate(
    page: number,
    limit: number,
  ): Promise<[ReservationOrigin[], number]> {
    return this.reservationsOriginsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async softDelete(reservationOriginId: string): Promise<ReservationOrigin> {
    await this.findOne(reservationOriginId);

    const result: UpdateResult =
      await this.reservationsOriginsRepository.update(reservationOriginId, {
        status: Status.DELETED,
        deletedAt: new Date(),
      });

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('reservation-origin');
    }

    return this.findOne(reservationOriginId);
  }

  async restore(reservationOriginId: string): Promise<ReservationOrigin> {
    await this.findOne(reservationOriginId);

    const result: UpdateResult =
      await this.reservationsOriginsRepository.update(reservationOriginId, {
        status: Status.ACTIVE,
        deletedAt: null,
      });

    if (result?.affected === 0) {
      throw new FailedRestoreException('reservation-origin');
    }

    return this.findOne(reservationOriginId);
  }

  async exists(
    criteria: FindOptionsWhere<ReservationOrigin>,
  ): Promise<boolean> {
    const count = await this.reservationsOriginsRepository.count({
      where: criteria,
    });

    return count > 0;
  }

  bulkSave(
    reservationsOrigins: ReservationOrigin[],
  ): Promise<ReservationOrigin[]> {
    return this.reservationsOriginsRepository.save(reservationsOrigins);
  }

  bulkUpdate(
    reservationsOrigins: ReservationOrigin[],
  ): Promise<ReservationOrigin[]> {
    return this.reservationsOriginsRepository.save(reservationsOrigins);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.reservationsOriginsRepository.query(query, params);
  }
}
