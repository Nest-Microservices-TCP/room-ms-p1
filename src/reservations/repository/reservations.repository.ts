import {
  In,
  Repository,
  QueryRunner,
  DeleteResult,
  UpdateResult,
  FindOptionsWhere,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  FailedRemoveException,
  FailedRestoreException,
  EntityNotFoundException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

import { IReservationsRepository } from './interfaces/reservations.repository.interface';

import { Status } from 'src/common/enums';
import { Reservation } from '../entity/reservation.entity';

import { SaveReservationType } from '../types';
import { DeleteResultResponse } from 'src/common/dto/response';

export class ReservationsRepository implements IReservationsRepository {
  private reservationsRepository: Repository<Reservation>;

  constructor(
    @InjectRepository(Reservation)
    private readonly defaultRepository: Repository<Reservation>,
  ) {}

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.reservationsRepository =
        queryRunner.manager.getRepository(Reservation);
    } else {
      this.reservationsRepository = this.defaultRepository;
    }
  }

  find(): Promise<Reservation[]> {
    // TODO: Agregar un dto que permita enviar filtros
    return this.reservationsRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOne(reservation_id: string): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOne({
      where: {
        reservation_id,
      },
    });

    if (!reservation) {
      throw new EntityNotFoundException('reservation');
    }

    return reservation;
  }

  create(request: Partial<Reservation>): Reservation {
    return this.reservationsRepository.create(request);
  }

  save(request: SaveReservationType): Promise<Reservation> {
    return this.reservationsRepository.save(request);
  }

  async update(
    conditions: FindOptionsWhere<Reservation>,
    request: Partial<Reservation>,
  ): Promise<Reservation> {
    const reservation = await this.findByCriteria(conditions);

    Object.assign(reservation, request);

    return this.reservationsRepository.save(reservation);
  }

  async remove(reservation_id: string): Promise<DeleteResultResponse> {
    await this.findOne(reservation_id);

    const result: DeleteResult = await this.reservationsRepository.delete({
      reservation_id,
    });

    if (result?.affected === 0) {
      throw new FailedRemoveException('reservation');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(reservations_ids: string[]): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      where: {
        reservation_id: In(reservations_ids),
      },
    });
  }

  findByCriteria(
    criteria: FindOptionsWhere<Reservation>,
  ): Promise<Reservation> {
    return this.reservationsRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<Reservation[]> {
    return this.reservationsRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<Reservation>): Promise<number> {
    return this.reservationsRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[Reservation[], number]> {
    return this.reservationsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async softDelete(reservationId: string): Promise<Reservation> {
    await this.findOne(reservationId);

    const result: UpdateResult = await this.reservationsRepository.update(
      reservationId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('reservation');
    }

    return this.findOne(reservationId);
  }

  async restore(reservationId: string): Promise<Reservation> {
    await this.findOne(reservationId);

    const result: UpdateResult = await this.reservationsRepository.update(
      reservationId,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('reservation');
    }

    return this.findOne(reservationId);
  }

  async exists(criteria: FindOptionsWhere<Reservation>): Promise<boolean> {
    const count = await this.reservationsRepository.count({ where: criteria });

    return count > 0;
  }

  bulkSave(reservations: Reservation[]): Promise<Reservation[]> {
    return this.reservationsRepository.save(reservations);
  }

  bulkUpdate(reservations: Reservation[]): Promise<Reservation[]> {
    return this.reservationsRepository.save(reservations);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.reservationsRepository.query(query, params);
  }
}
