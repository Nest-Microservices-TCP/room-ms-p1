import { Module } from '@nestjs/common';
import { RoomsStatesController } from './rooms-state-controller';
import { RoomsStatesService } from './rooms-state.service';
import { RoomStateEntity } from './entities/room-state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsStatesRepository } from './repositories/rooms-state.repository';
import { UnitOfWork } from 'src/common/unit-of-work/unit-of-work.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomStateEntity])],
  controllers: [RoomsStatesController],
  providers: [UnitOfWork, RoomsStatesService, RoomsStatesRepository],
})
export class RoomsStatesModule {}
