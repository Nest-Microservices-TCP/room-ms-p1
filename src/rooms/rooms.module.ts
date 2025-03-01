import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomsRepository } from './repositories/rooms.repository';

import { Room } from './entity/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomsRepository, RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
