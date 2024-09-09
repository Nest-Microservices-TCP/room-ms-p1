import { Module } from '@nestjs/common';
import { RoomsStatesController } from './rooms-state.controller';
import { RoomsStatesService } from './rooms-state.service';
import { RoomStateEntity } from './entities/room-state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsStatesRepository } from './repositories/rooms-state.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoomStateEntity])],
  controllers: [RoomsStatesController],
  providers: [RoomsStatesService, RoomsStatesRepository],
})
export class RoomsStatesModule {}
