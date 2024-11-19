/* eslint-disable @typescript-eslint/no-unused-vars */
import { IReservationsRepository } from './interfaces/reservations.repository.interface';
import { CreateReservationDto, UpdateReservationDto } from '../dto/request';
import { ReservationEntity } from '../entity/reservation.entity';
import { DeleteResultResponse } from 'src/common/dto/response';
import {
  QueryRunner,
  FindOptionsWhere,
  Repository,
  DeleteResult,
  In,
  UpdateResult,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import {
  EntityNotFoundException,
  FailedRemoveException,
  FailedRestoreException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

export class ReservationsRepository implements IReservationsRepository {
  private reservationsRepository: Repository<ReservationEntity>;

  constructor(
    @InjectRepository(ReservationEntity)
    private readonly defaultRepository: Repository<ReservationEntity>,
  ) {}

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.reservationsRepository =
        queryRunner.manager.getRepository(ReservationEntity);
    } else {
      this.reservationsRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<ReservationEntity[]> {
    // TODO: Agregar un dto que permita enviar filtros
    return this.reservationsRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOneById(reservationId: string): Promise<ReservationEntity> {
    const reservation = await this.reservationsRepository.findOne({
      where: {
        reservationId,
      },
    });

    if (!reservation) {
      throw new EntityNotFoundException('reservation');
    }

    return reservation;
  }

  create(request: Partial<ReservationEntity>): ReservationEntity {
    return this.reservationsRepository.create(request);
  }

  save(request: CreateReservationDto): Promise<ReservationEntity> {
    return this.reservationsRepository.save(request);
  }

  async update(request: UpdateReservationDto): Promise<ReservationEntity> {
    const { reservationId } = request;

    const reservation = await this.findOneById(reservationId);

    Object.assign(reservation, request);

    return this.reservationsRepository.save(reservation);
  }

  async remove(reservationId: string): Promise<DeleteResultResponse> {
    await this.findOneById(reservationId);

    const result: DeleteResult = await this.reservationsRepository.delete({
      reservationId,
    });

    if (result?.affected === 0) {
      throw new FailedRemoveException('reservation');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(reservationsIds: string[]): Promise<ReservationEntity[]> {
    return this.reservationsRepository.find({
      where: {
        reservationId: In(reservationsIds),
      },
    });
  }

  findByCriteria(
    criteria: FindOptionsWhere<ReservationEntity>,
  ): Promise<ReservationEntity> {
    return this.reservationsRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<ReservationEntity[]> {
    return this.reservationsRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<ReservationEntity>): Promise<number> {
    return this.reservationsRepository.count({ where: criteria });
  }

  paginate(
    page: number,
    limit: number,
  ): Promise<[ReservationEntity[], number]> {
    return this.reservationsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async softDelete(reservationId: string): Promise<ReservationEntity> {
    await this.findOneById(reservationId);

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

    return this.findOneById(reservationId);
  }

  async restore(reservationId: string): Promise<ReservationEntity> {
    await this.findOneById(reservationId);

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

    return this.findOneById(reservationId);
  }

  async exists(
    criteria: FindOptionsWhere<ReservationEntity>,
  ): Promise<boolean> {
    const count = await this.reservationsRepository.count({ where: criteria });

    return count > 0;
  }

  bulkSave(entities: ReservationEntity[]): Promise<ReservationEntity[]> {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(entities: ReservationEntity[]): Promise<ReservationEntity[]> {
    throw new Error('Method not implemented.');
  }
  customQuery(query: string, params: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
