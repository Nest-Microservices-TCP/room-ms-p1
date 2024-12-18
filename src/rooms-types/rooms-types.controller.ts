import { RoomsTypesService } from './rooms-types.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoomTypeResponseDto } from './dto/response';
import { Controller } from '@nestjs/common';
import { CreateRoomTypeDto } from './dto/request';

@Controller()
export class RoomsTypesController {
  constructor(private readonly roomsTypesService: RoomsTypesService) {}

  @MessagePattern({ cmd: 'find.all.rooms.types' })
  findAll(): Promise<RoomTypeResponseDto[]> {
    return this.roomsTypesService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.room.type' })
  findOne(
    @Payload('roomTypeId') roomTypeId: string,
  ): Promise<RoomTypeResponseDto> {
    return this.roomsTypesService.findOne(roomTypeId);
  }

  @MessagePattern({ cmd: 'find.rooms.types.by.ids' })
  findByIds(
    @Payload('roomsTypesIds') roomsTypesIds: string[],
  ): Promise<RoomTypeResponseDto[]> {
    return this.roomsTypesService.findByIds(roomsTypesIds);
  }

  @MessagePattern({ cmd: 'save.room.type' })
  async save(
    @Payload() request: CreateRoomTypeDto,
  ): Promise<RoomTypeResponseDto> {
    return this.roomsTypesService.save(request);
  }
}
