import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomTypeAmenity } from './entity/room-type-amenity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomTypeAmenity])],
})
export class RoomsTypesAmenitiesModule {}
