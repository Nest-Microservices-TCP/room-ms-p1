import { InjectRepository } from '@nestjs/typeorm';
import { RoomStateEntity } from '../entities/room-state.entity';
import { IRoomsStateRepository } from './interfaces/rooms-state.repository.interface';
import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { CreateRoomStateDto } from '../dto/create-room-state.dto';
import { UpdateRoomStateDto } from '../dto';
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

  async findOneById(id: string): Promise<RoomStateEntity> {
    const roomState = await this.roomsStatesRepository.findOne({
      where: { id },
    });

    if (!roomState) {
      throw new EntityNotFoundException('roomStateId');
    }

    return roomState;
  }

  findAll(): Promise<RoomStateEntity[]> {
    return this.roomsStatesRepository.find();
  }

  create(request: Partial<RoomStateEntity>): RoomStateEntity {
    return this.roomsStatesRepository.create(request);
  }

  save(request: CreateRoomStateDto): Promise<RoomStateEntity> {
    //TODO: Validate repeated rooms
    return this.roomsStatesRepository.save(request);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(request: UpdateRoomStateDto): Promise<RoomStateEntity> {
    throw new Error('Method not implemented.');
  }

  async deleteById(id: string): Promise<RoomStateEntity> {
    const roomState = await this.roomsStatesRepository.findOne({
      where: { id },
    });

    await this.roomsStatesRepository.delete(id);

    return roomState;
  }
}
