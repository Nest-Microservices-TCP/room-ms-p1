import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from './dto/request';
import { RoomTypeResponseDto } from './dto/response';

import { RoomsTypesService } from './rooms-types.service';

@Controller()
export class RoomsTypesController {
  constructor(private readonly roomsTypesService: RoomsTypesService) {}

  @MessagePattern('rooms.find.all.rooms.types')
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
  save(@Payload() request: CreateRoomTypeDto): Promise<RoomTypeResponseDto> {
    return this.roomsTypesService.save(request);
  }

  @MessagePattern({ cmd: 'update.room.type' })
  update(@Payload() request: UpdateRoomTypeDto): Promise<RoomTypeResponseDto> {
    return this.roomsTypesService.update(request);
  }

  @MessagePattern({ cmd: 'remove.room.type' })
  remove(
    @Payload('roomTypeId') roomTypeId: string,
  ): Promise<DeleteResultResponse> {
    return this.roomsTypesService.remove(roomTypeId);
  }
}
