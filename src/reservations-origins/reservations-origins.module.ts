import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationOrigin } from './entity/reservation-origin.entity';

import { ReservationsOriginsRepository } from './repository/reservations-origins.repository';
import { ReservationsOriginsController } from './reservations-origins.controller';
import { ReservationsOriginsService } from './reservations-origins.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationOrigin])],
  providers: [ReservationsOriginsRepository, ReservationsOriginsService],
  controllers: [ReservationsOriginsController],
})
export class ReservationsOriginsModule {}
