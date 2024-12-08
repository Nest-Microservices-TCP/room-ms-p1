import { RoomsStatesRepository } from './repository/rooms-states.repository';
import { RoomsStatesController } from './rooms-states.controller';
import { RoomsStatesService } from './rooms-states.service';
import { RoomState } from './entity/room-state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([RoomState])],
  controllers: [RoomsStatesController],
  providers: [RoomsStatesService, RoomsStatesRepository],
})
export class RoomsStatesModule {}
