/* eslint-disable @typescript-eslint/no-unused-vars */
import { IReservationsRepository } from './interfaces/reservations.repository.interface';
import { CreateReservationDto, UpdateReservationDto } from '../dto/request';
import { ReservationEntity } from '../entity/reservation.entity';
import { DeleteResultResponse } from 'src/common/dto/response';
import { QueryRunner, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';

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

  findOneById(reservationId: string): Promise<ReservationEntity> {
    return this.reservationsRepository.findOne({
      where: {
        reservationId,
      },
    });
  }

  create(request: Partial<ReservationEntity>): ReservationEntity {
    throw new Error('Method not implemented.');
  }
  save(request: CreateReservationDto): Promise<ReservationEntity> {
    throw new Error('Method not implemented.');
  }
  update(request: UpdateReservationDto): Promise<ReservationEntity> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<DeleteResultResponse> {
    throw new Error('Method not implemented.');
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
