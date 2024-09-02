import { Controller } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoomStateDto } from 'src/rooms-states/dto/create-room-state.dto';
import { CreateRoomDto, UpdateRoomDto } from './dto';
import { RoomEntity } from './entities/room.entity';

@Controller()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  save(request: CreateRoomDto): Promise<RoomEntity> {
    return this.roomsService.save(request);
  }

  findOnById(id: string): Promise<RoomEntity> {
    return this.roomsService.findOneById(id);
  }

  findAll() {
    return this.roomsService.findAll();
  }

  update(request: UpdateRoomDto): Promise<RoomEntity> {
    return this.roomsService.update(request);
  }

  delete(id: string): Promise<RoomEntity> {
    return this.roomsService.deleteById(id);
  }

  @MessagePattern({ cmd: 'get.hello' })
  getHello(@Payload() request: CreateRoomStateDto) {
    console.log('payload->', { request });
    return 'Hola desde el microservicio';
  }
}
