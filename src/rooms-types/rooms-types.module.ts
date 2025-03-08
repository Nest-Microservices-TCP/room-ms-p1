import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsTypesService } from './rooms-types.service';
import { RoomsTypesController } from './rooms-types.controller';
import { RoomsTypesRepository } from './repository/rooms-types.repository';

import { RoomType } from './entity/room-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType])],
  providers: [RoomsTypesRepository, RoomsTypesService],
  controllers: [RoomsTypesController],
})
export class RoomsTypesModule {}
