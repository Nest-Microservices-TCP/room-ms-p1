import { RoomsTypesService } from './rooms-types.service';
import { MessagePattern } from '@nestjs/microservices';
import { RoomTypeResponseDto } from './dto/response';
import { Controller } from '@nestjs/common';

@Controller()
export class RoomsTypesController {
  constructor(private readonly roomsTypesService: RoomsTypesService) {}

  @MessagePattern({ cmd: 'find.all.rooms.types' })
  findAll(): Promise<RoomTypeResponseDto[]> {
    return this.roomsTypesService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.room.type' })
  findOne(roomTypeId: string): Promise<RoomTypeResponseDto> {
    return this.roomsTypesService.findOne(roomTypeId);
  }

  @MessagePattern({ cmd: 'find.rooms.types.by.ids' })
  findByIds(roomsTypesIds: string[]): Promise<RoomTypeResponseDto[]> {
    return this.roomsTypesService.findByIds(roomsTypesIds);
  }
}
