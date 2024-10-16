import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsStatesService } from './rooms-state.service';
import { RoomStateEntity } from './entity/room-state.entity';
import { RoomsStatesController } from './rooms-state.controller';
import { RoomsStatesRepository } from './repositories/rooms-state.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoomStateEntity])],
  controllers: [RoomsStatesController],
  providers: [RoomsStatesService, RoomsStatesRepository],
})
export class RoomsStatesModule {}
