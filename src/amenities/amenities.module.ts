import { AmenitiesRepository } from './repository/amenities.repository';
import { AmenitiesController } from './amenities.controller';
import { AmenitiesService } from './amenities.service';
import { Amenity } from './entity/amenity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Amenity])],
  providers: [AmenitiesRepository, AmenitiesService],
  controllers: [AmenitiesController],
})
export class AmenitiesModule {}
