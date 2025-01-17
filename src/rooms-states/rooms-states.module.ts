import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomState } from './entity/room-state.entity';

import { RoomsStatesRepository } from './repository/rooms-states.repository';
import { RoomsStatesController } from './rooms-states.controller';
import { RoomsStatesService } from './rooms-states.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomState])],
  controllers: [RoomsStatesController],
  providers: [RoomsStatesService, RoomsStatesRepository],
})
export class RoomsStatesModule {}
