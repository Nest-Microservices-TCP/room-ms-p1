import { EntityNotFoundException } from 'src/common/exceptions/custom/entity-not-found.exception';
import { IRoomsRepository } from './interfaces/rooms.repository.interface';
import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRoomDto, UpdateRoomDto } from '../dto/request';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../entity/room.entity';
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
  private roomsRepository: Repository<Room>;

  constructor(
    @InjectRepository(Room)
    private readonly defaultRepository: Repository<Room>,
  ) {
    this.roomsRepository = defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.roomsRepository = queryRunner.manager.getRepository(Room);
    } else {
      this.roomsRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<Room[]> {
    return this.roomsRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOneById(roomId: string): Promise<Room> {
    const room = await this.roomsRepository.findOne({ where: { roomId } });

    if (!room) {
      throw new EntityNotFoundException('room');
    }

    return room;
  }

  create(request: Partial<Room>): Room {
    return this.roomsRepository.create(request);
  }

  async save(request: CreateRoomDto): Promise<Room> {
    return this.roomsRepository.save(request);
  }

  async update(request: UpdateRoomDto): Promise<Room> {
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

  findByIds(roomsIds: string[]): Promise<Room[]> {
    return this.roomsRepository.find({
      where: {
        roomId: In(roomsIds),
      },
    });
  }

  findByCriteria(criteria: FindOptionsWhere<Room>): Promise<Room> {
    return this.roomsRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<Room[]> {
    return this.roomsRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<Room>): Promise<number> {
    return this.roomsRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[Room[], number]> {
    return this.roomsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<Room>): Promise<boolean> {
    const count = await this.roomsRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(roomId: string): Promise<Room> {
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

  async restore(roomId: string): Promise<Room> {
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

  bulkSave(rooms: Room[]): Promise<Room[]> {
    return this.roomsRepository.save(rooms);
  }

  bulkUpdate(rooms: Room[]): Promise<Room[]> {
    return this.roomsRepository.save(rooms);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.roomsRepository.query(query, params);
  }
}
