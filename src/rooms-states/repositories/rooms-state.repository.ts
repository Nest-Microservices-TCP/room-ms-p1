import { Status } from 'src/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { QueryRunner, Repository, UpdateResult } from 'typeorm';
import { RoomStateEntity } from '../entities/room-state.entity';
import { FailedDeleteException } from 'src/common/exceptions/custom';
import { UpdateRoomStateDto, CreateRoomStateDto } from '../dto/request';
import { IRoomsStateRepository } from './interfaces/rooms-state.repository.interface';
import { EntityNotFoundException } from 'src/common/exceptions/custom/entity-not-found.exception';

@Injectable()
export class RoomsStatesRepository implements IRoomsStateRepository {
  private roomsStatesRepository: Repository<RoomStateEntity>;

  constructor(
    @InjectRepository(RoomStateEntity)
    private readonly defaultRepository: Repository<RoomStateEntity>,
  ) {
    this.roomsStatesRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.roomsStatesRepository =
        queryRunner.manager.getRepository(RoomStateEntity);
    } else {
      this.roomsStatesRepository = this.defaultRepository;
    }
  }

  async findOneById(roomStateId: string): Promise<RoomStateEntity> {
    const roomState = await this.roomsStatesRepository.findOne({
      where: { roomStateId },
    });

    if (!roomState) {
      throw new EntityNotFoundException('room-state');
    }

    return roomState;
  }

  findAll(): Promise<RoomStateEntity[]> {
    return this.roomsStatesRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  create(request: Partial<RoomStateEntity>): RoomStateEntity {
    return this.roomsStatesRepository.create(request);
  }

  async save(request: CreateRoomStateDto): Promise<RoomStateEntity> {
    const { name } = request;

    const roomState = await this.roomsStatesRepository.findOne({
      where: {
        name,
      },
    });

    if (roomState) {
      throw new ConflictException(
        `Already exists a room state with name: ${name}`,
      );
    }

    return this.roomsStatesRepository.save(request);
  }

  async update(request: UpdateRoomStateDto): Promise<RoomStateEntity> {
    const { roomStateId } = request;

    const roomState = await this.findOneById(roomStateId);

    Object.assign(roomState, request);

    return this.roomsStatesRepository.save(roomState);
  }

  async deleteById(roomStateId: string): Promise<RoomStateEntity> {
    await this.findOneById(roomStateId);

    const result: UpdateResult = await this.roomsStatesRepository.update(
      roomStateId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result.affected !== 1) {
      throw new FailedDeleteException('room-state');
    }

    return this.findOneById(roomStateId);
  }
}
