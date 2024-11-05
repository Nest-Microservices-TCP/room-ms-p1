import { EntityNotFoundException } from 'src/common/exceptions/custom/entity-not-found.exception';
import { IRoomsRepository } from './interfaces/rooms.repository.interface';
import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRoomDto, UpdateRoomDto } from '../dto/request';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from '../entity/room.entity';
import { Status } from 'src/common/enums';
import {
  In,
  Repository,
  QueryRunner,
  UpdateResult,
  DeleteResult,
  FindOptionsWhere,
} from 'typeorm';
import {
  FailedRemoveException,
  FailedRestoreException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

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

  async remove(roomId: string): Promise<DeleteResultResponse> {
    await this.findOneById(roomId);

    const result: DeleteResult = await this.roomsRepository.delete(roomId);

    if (result.affected === 0) {
      throw new FailedRemoveException('room');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(roomsIds: string[]): Promise<RoomEntity[]> {
    return this.roomsRepository.find({
      where: {
        roomId: In(roomsIds),
      },
    });
  }

  findByCriteria(criteria: FindOptionsWhere<RoomEntity>): Promise<RoomEntity> {
    return this.roomsRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<RoomEntity[]> {
    return this.roomsRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<RoomEntity>): Promise<number> {
    return this.roomsRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[RoomEntity[], number]> {
    return this.roomsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<RoomEntity>): Promise<boolean> {
    const count = await this.roomsRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(roomId: string): Promise<RoomEntity> {
    await this.findOneById(roomId);

    const result: UpdateResult = await this.roomsRepository.update(roomId, {
      status: Status.DELETED,
      deletedAt: new Date(),
    });

    if (result.affected === 0) {
      throw new FailedSoftDeleteException('room');
    }

    return this.findOneById(roomId);
  }

  async restore(roomId: string): Promise<RoomEntity> {
    await this.findOneById(roomId);

    const result: UpdateResult = await this.roomsRepository.update(roomId, {
      status: Status.ACTIVE,
      deletedAt: null,
    });

    if (result.affected === 0) {
      throw new FailedRestoreException('room');
    }

    return this.findOneById(roomId);
  }

  bulkSave(rooms: RoomEntity[]): Promise<RoomEntity[]> {
    return this.roomsRepository.save(rooms);
  }

  bulkUpdate(rooms: RoomEntity[]): Promise<RoomEntity[]> {
    return this.roomsRepository.save(rooms);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.roomsRepository.query(query, params);
  }
}
