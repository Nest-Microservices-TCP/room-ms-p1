import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  RoomState,
  CreateRoomStateRequest,
  FindOneRoomStateRequest,
  RoomsStatesServiceController,
  RoomsStatesServiceControllerMethods,
} from 'src/grpc/proto/rooms/rooms_states.pb';

import { RoomsStatesService } from './rooms-states.service';

@Controller()
@RoomsStatesServiceControllerMethods()
export class RoomsStatesController implements RoomsStatesServiceController {
  constructor(private readonly roomsStatesService: RoomsStatesService) {}

  createRoomState(request: CreateRoomStateRequest): void {
    this.roomsStatesService.save(request);
  }
  getRoomState(
    request: FindOneRoomStateRequest,
  ): Promise<RoomState> | Observable<RoomState> | RoomState {
    return this.roomsStatesService.findOne(request);
  }
}
