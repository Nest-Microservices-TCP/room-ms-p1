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
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import {
  EntityNotFoundException,
  FailedRemoveException,
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

  findByIds(ids: string[]): Promise<ReservationEntity[]> {
    throw new Error('Method not implemented.');
  }
  findByCriteria(
    criteria: FindOptionsWhere<ReservationEntity>,
  ): Promise<ReservationEntity> {
    throw new Error('Method not implemented.');
  }
  findWithRelations(relations: string[]): Promise<ReservationEntity[]> {
    throw new Error('Method not implemented.');
  }
  count(criteria: FindOptionsWhere<ReservationEntity>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  paginate(
    page: number,
    limit: number,
  ): Promise<[ReservationEntity[], number]> {
    throw new Error('Method not implemented.');
  }
  softDelete(id: string): Promise<ReservationEntity> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<ReservationEntity> {
    throw new Error('Method not implemented.');
  }
  exists(criteria: FindOptionsWhere<ReservationEntity>): Promise<boolean> {
    throw new Error('Method not implemented.');
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
