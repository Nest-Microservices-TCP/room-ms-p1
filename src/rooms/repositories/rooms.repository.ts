/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityNotFoundException } from 'src/common/exceptions/custom/entity-not-found.exception';
import { IRoomsRepository } from './interfaces/rooms.repository.interface';
import { FailedRemoveException } from 'src/common/exceptions/custom';
import { CreateRoomDto, UpdateRoomDto } from '../dto/request';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { RoomEntity } from '../entity/room.entity';
import { Status } from 'src/common/enums';
import {
  Repository,
  QueryRunner,
  UpdateResult,
  FindOptionsWhere,
  DeleteResult,
} from 'typeorm';

export class RoomsRepository implements IRoomsRepository {
  private roomsRepository: Repository<RoomEntity>;

  constructor(
    @InjectRepository(RoomEntity)
    private readonly defaultRepository: Repository<RoomEntity>,
  ) {
    this.roomsRepository = defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.roomsRepository = queryRunner.manager.getRepository(RoomEntity);
    } else {
      this.roomsRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<RoomEntity[]> {
    return this.roomsRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOneById(roomId: string): Promise<RoomEntity> {
    const room = await this.roomsRepository.findOne({ where: { roomId } });

    if (!room) {
      throw new EntityNotFoundException('room');
    }

    return room;
  }

  create(request: Partial<RoomEntity>): RoomEntity {
    return this.roomsRepository.create(request);
  }

  async save(request: CreateRoomDto): Promise<RoomEntity> {
    return this.roomsRepository.save(request);
  }

  async update(request: UpdateRoomDto): Promise<RoomEntity> {
    const { roomId } = request;

    const room = await this.findOneById(roomId);

    Object.assign(room, request);

    return this.roomsRepository.save(room);
  }

  async remove(roomId: string): Promise<RoomEntity> {
    await this.findOneById(roomId);

    const result: DeleteResult = await this.roomsRepository.delete(roomId);

    if (result.affected === 0) {
      throw new FailedRemoveException('room');
    }

    return this.findOneById(roomId);
  }

  findByIds(ids: string[]): Promise<RoomEntity[]> {
    throw new Error('Method not implemented.');
  }
  findByCriteria(criteria: FindOptionsWhere<RoomEntity>): Promise<RoomEntity> {
    throw new Error('Method not implemented.');
  }
  findWithRelations(relations: string[]): Promise<RoomEntity[]> {
    throw new Error('Method not implemented.');
  }
  count(criteria: FindOptionsWhere<RoomEntity>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  paginate(page: number, limit: number): Promise<[RoomEntity[], number]> {
    throw new Error('Method not implemented.');
  }
  softDelete(id: string): Promise<RoomEntity> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<RoomEntity> {
    throw new Error('Method not implemented.');
  }
  exists(criteria: FindOptionsWhere<RoomEntity>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  bulkSave(entities: RoomEntity[]): Promise<RoomEntity[]> {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(entities: RoomEntity[]): Promise<RoomEntity[]> {
    throw new Error('Method not implemented.');
  }
  customQuery(query: string, params: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
