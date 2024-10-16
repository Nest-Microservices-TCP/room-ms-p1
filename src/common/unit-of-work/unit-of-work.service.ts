import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { IUnitForWork } from './interfaces/unit-of-work.interface';
import { RoomsStatesRepository } from '../../rooms-states/repository/rooms-state.repository';

@Injectable()
export class UnitOfWork implements IUnitForWork {
  private queryRunner: QueryRunner;

  constructor(
    private readonly dataSource: DataSource,
    private readonly roomsStatesRepository: RoomsStatesRepository,
  ) {
    this.queryRunner = this.dataSource.createQueryRunner();
  }

  async start(): Promise<void> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async complete(work: () => Promise<void>): Promise<void> {
    try {
      await work();
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await this.queryRunner.release();
    }
  }

  getRoomsStatesRepository(): RoomsStatesRepository {
    return this.roomsStatesRepository;
  }
}
