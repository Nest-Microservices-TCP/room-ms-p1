import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  Room,
  GetRoomRequest,
  CreateRoomRequest,
  ListRoomsResponse,
  RoomsServiceController,
  RoomsServiceControllerMethods,
} from 'src/grpc/proto/rooms/rooms.pb';

import { RoomsService } from './rooms.service';

@Controller()
@RoomsServiceControllerMethods()
export class RoomsController implements RoomsServiceController {
  constructor(private readonly roomsService: RoomsService) {}

  createRoom(request: CreateRoomRequest): void {
    this.roomsService.createRoom(request);
  }
  getRoom(request: GetRoomRequest): Promise<Room> | Observable<Room> | Room {
    return this.roomsService.getRoom(request);
  }
  listRooms():
    | Promise<ListRoomsResponse>
    | Observable<ListRoomsResponse>
    | ListRoomsResponse {
    return this.roomsService.listRooms();
  }
}
