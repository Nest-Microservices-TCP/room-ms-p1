import { RoomsStatesRepository } from './repository/rooms-states.repository';
import { RoomsStatesController } from './rooms-states.controller';
import { RoomStateEntity } from './entity/room-state.entity';
import { RoomsStatesService } from './rooms-states.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([RoomStateEntity])],
  controllers: [RoomsStatesController],
  providers: [RoomsStatesService, RoomsStatesRepository],
})
export class RoomsStatesModule {}
