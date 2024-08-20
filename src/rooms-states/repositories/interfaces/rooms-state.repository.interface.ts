import { CreateRoomStateDto } from 'src/rooms-states/dto/create-room-state.dto';
import { RoomStateEntity } from 'src/rooms-states/entities/room-state.entity';

export interface IRoomsStateRepository {
  findById(id: string): Promise<RoomStateEntity>;
  findAll(): Promise<RoomStateEntity[]>;
  create(roomState: Partial<RoomStateEntity>): RoomStateEntity;
  save(request: CreateRoomStateDto): Promise<RoomStateEntity>;
  deleteById(id: string): Promise<RoomStateEntity>;
}
