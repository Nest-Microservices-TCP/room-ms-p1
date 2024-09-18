import { Controller } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoomDto, UpdateRoomDto } from './dto/request';
import { RoomResponseDto } from './dto/response';

@Controller()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @MessagePattern({ cmd: 'save.room' })
  save(@Payload() request: CreateRoomDto): Promise<RoomResponseDto> {
    return this.roomsService.save(request);
  }

  @MessagePattern({ cmd: 'find.one.room.by.id' })
  findOnById(@Payload('id') id: string): Promise<RoomResponseDto> {
    return this.roomsService.findOneById(id);
  }

  @MessagePattern({ cmd: 'find.all.rooms' })
  findAll(): Promise<RoomResponseDto[]> {
    return this.roomsService.findAll();
  }

  @MessagePattern({ cmd: 'update.room' })
  update(@Payload() request: UpdateRoomDto): Promise<RoomResponseDto> {
    return this.roomsService.update(request);
  }

  @MessagePattern({ cmd: 'delete.room.by.id' })
  deleteById(@Payload('id') id: string): Promise<RoomResponseDto> {
    return this.roomsService.deleteById(id);
  }
}
