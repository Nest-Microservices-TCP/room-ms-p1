import { IReservationsRepository } from './interfaces/reservations.repository.interface';
import { CreateReservationDto, UpdateReservationDto } from '../dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { Reservation } from '../entity/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import {
  In,
  Repository,
  QueryRunner,
  DeleteResult,
  UpdateResult,
  FindOptionsWhere,
} from 'typeorm';
import {
  FailedRemoveException,
  FailedRestoreException,
  EntityNotFoundException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

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

  findAll(): Promise<Reservation[]> {
    // TODO: Agregar un dto que permita enviar filtros
    return this.reservationsRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOneById(reservationId: string): Promise<Reservation> {
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

  create(request: Partial<Reservation>): Reservation {
    return this.reservationsRepository.create(request);
  }

  save(request: CreateReservationDto): Promise<Reservation> {
    return this.reservationsRepository.save(request);
  }

  async update(request: UpdateReservationDto): Promise<Reservation> {
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

  findByIds(reservationsIds: string[]): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      where: {
        reservationId: In(reservationsIds),
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

  async restore(reservationId: string): Promise<Reservation> {
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
