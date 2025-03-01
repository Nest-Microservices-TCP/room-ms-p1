import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AmenitiesService } from './amenities.service';
import { AmenitiesController } from './amenities.controller';
import { AmenitiesRepository } from './repository/amenities.repository';

import { Amenity } from './entity/amenity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Amenity])],
  providers: [AmenitiesRepository, AmenitiesService],
  controllers: [AmenitiesController],
})
export class AmenitiesModule {}
