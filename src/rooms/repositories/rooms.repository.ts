import { QueryRunner, Repository } from 'typeorm';
import { CreateRoomDto, UpdateRoomDto } from '../dto';
import { RoomEntity } from '../entities/room.entity';
import { IRoomsRepository } from './interfaces/rooms.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

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
    return this.roomsRepository.find();
  }

  findOneById(id: string): Promise<RoomEntity> {
    return this.roomsRepository.findOne({ where: { id } });
  }

  create(request: Partial<RoomEntity>): RoomEntity {
    return this.roomsRepository.create(request);
  }

  save(request: CreateRoomDto): Promise<RoomEntity> {
    return this.roomsRepository.save(request);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(request: UpdateRoomDto): Promise<RoomEntity> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteById(id: string): Promise<RoomEntity> {
    throw new Error('Method not implemented.');
  }
}
