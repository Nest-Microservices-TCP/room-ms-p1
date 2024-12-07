import { AmenitiesRepository } from './repository/amenities.repository';
import { AmenitiesController } from './amenities.controller';
import { AmenityEntity } from './entity/amenity.entity';
import { AmenitiesService } from './amenities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([AmenityEntity])],
  providers: [AmenitiesRepository, AmenitiesService],
  controllers: [AmenitiesController],
})
export class AmenitiesModule {}
