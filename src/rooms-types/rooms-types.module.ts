import { RoomsTypesRepository } from './repository/rooms-types.repository';
import { RoomsTypesController } from './rooms-types.controller';
import { RoomsTypesService } from './rooms-types.service';
import { RoomType } from './entity/room-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType])],
  providers: [RoomsTypesRepository, RoomsTypesService],
  controllers: [RoomsTypesController],
})
export class RoomsTypesModule {}
