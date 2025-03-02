import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsStatesService } from './rooms-states.service';
import { RoomsStatesController } from './rooms-states.controller';
import { RoomsStatesRepository } from './repository/rooms-states.repository';

import { RoomState } from './entity/room-state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomState])],
  providers: [RoomsStatesService, RoomsStatesRepository],
  controllers: [RoomsStatesController],
})
export class RoomsStatesModule {}
