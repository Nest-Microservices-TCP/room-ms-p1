import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from './dto/request';
import { RoomTypeResponseDto } from './dto/response';

import { RoomsTypesService } from './rooms-types.service';

@Controller()
export class RoomsTypesController {
  constructor(private readonly roomsTypesService: RoomsTypesService) {}

  @MessagePattern('roomsTypes.find.all')
  async findAll(): Promise<RoomTypeResponseDto[]> {
    return this.roomsTypesService.findAll();
  }

  @MessagePattern('roomsTypes.find.one')
  async findOne(
    @Payload('roomTypeId') roomTypeId: string,
  ): Promise<RoomTypeResponseDto> {
    return this.roomsTypesService.findOne(roomTypeId);
  }

  @MessagePattern('roomsTypes.find.by.ids')
  async findByIds(
    @Payload('roomsTypesIds') roomsTypesIds: string[],
  ): Promise<RoomTypeResponseDto[]> {
    return this.roomsTypesService.findByIds(roomsTypesIds);
  }

  @MessagePattern('roomsTypes.save')
  async save(
    @Payload() request: CreateRoomTypeDto,
  ): Promise<RoomTypeResponseDto> {
    return this.roomsTypesService.save(request);
  }

  @MessagePattern('roomsTypes.update')
  async update(
    @Payload() request: UpdateRoomTypeDto,
  ): Promise<RoomTypeResponseDto> {
    return this.roomsTypesService.update(request);
  }

  @MessagePattern('roomsTypes.remove')
  async remove(
    @Payload('roomTypeId') roomTypeId: string,
  ): Promise<DeleteResultResponse> {
    return this.roomsTypesService.remove(roomTypeId);
  }
}
