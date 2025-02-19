import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from './dto/request';
import { RoomTypeResponseDto } from './dto/response';

import { RoomsTypesService } from './rooms-types.service';

@Controller()
export class RoomsTypesController {
  constructor(private readonly roomsTypesService: RoomsTypesService) {}

  @MessagePattern('rooms.find.all.roomsTypes')
  findAll(): Promise<RoomTypeResponseDto[]> {
    return this.roomsTypesService.findAll();
  }

  @MessagePattern('rooms.find.one.roomType')
  findOne(
    @Payload('roomTypeId') roomTypeId: string,
  ): Promise<RoomTypeResponseDto> {
    return this.roomsTypesService.findOne(roomTypeId);
  }

  @MessagePattern('rooms.find.roomsTypes.by.ids')
  findByIds(
    @Payload('roomsTypesIds') roomsTypesIds: string[],
  ): Promise<RoomTypeResponseDto[]> {
    return this.roomsTypesService.findByIds(roomsTypesIds);
  }

  @MessagePattern('rooms.save.roomType')
  save(@Payload() request: CreateRoomTypeDto): Promise<RoomTypeResponseDto> {
    return this.roomsTypesService.save(request);
  }

  @MessagePattern('rooms.update.roomType')
  update(@Payload() request: UpdateRoomTypeDto): Promise<RoomTypeResponseDto> {
    return this.roomsTypesService.update(request);
  }

  @MessagePattern('rooms.remove.roomType')
  remove(
    @Payload('roomTypeId') roomTypeId: string,
  ): Promise<DeleteResultResponse> {
    return this.roomsTypesService.remove(roomTypeId);
  }
}
