import { Injectable } from '@nestjs/common';
import { UnitOfWork } from '../common/unit-of-work/unit-of-work.service';
import { RoomStateEntity } from './entities/room-state.entity';
import { CreateRoomStateDto } from './dto/create-room-state.dto';

@Injectable()
export class RoomsStatesService {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async save(request: CreateRoomStateDto): Promise<RoomStateEntity> {
    let newRoomState: RoomStateEntity;

    try {
      await this.unitOfWork.complete(async () => {
        const roomStatesRepository = this.unitOfWork.getRoomsStatesRepository();

        newRoomState = await roomStatesRepository.save(request);
      });

      return newRoomState;
    } catch (error) {
      throw new Error(
        `Error al guardar el estado de habitación: ${error.message}`,
      );
    }
  }
}
