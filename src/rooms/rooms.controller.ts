import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  Room,
  FindRoomsResponse,
  CreateRoomRequest,
  FindOneRoomRequest,
  RoomsServiceController,
  RoomsServiceControllerMethods,
} from 'src/grpc/proto-files/rooms/rooms.pb';

import { RoomsService } from './rooms.service';

@Controller()
@RoomsServiceControllerMethods()
export class RoomsController implements RoomsServiceController {
  constructor(private readonly roomsService: RoomsService) {}

  save(request: CreateRoomRequest): void {
    this.roomsService.save(request);
  }
  findOne(
    request: FindOneRoomRequest,
  ): Promise<Room> | Observable<Room> | Room {
    return this.roomsService.findOne(request);
  }
  find():
    | Promise<FindRoomsResponse>
    | Observable<FindRoomsResponse>
    | FindRoomsResponse {
    return this.roomsService.find();
  }
}
