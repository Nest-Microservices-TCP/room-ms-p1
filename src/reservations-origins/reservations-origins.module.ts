import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationsOriginsService } from './reservations-origins.service';
import { ReservationsOriginsController } from './reservations-origins.controller';
import { ReservationsOriginsRepository } from './repository/reservations-origins.repository';

import { ReservationOrigin } from './entity/reservation-origin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationOrigin])],
  providers: [ReservationsOriginsRepository, ReservationsOriginsService],
  controllers: [ReservationsOriginsController],
})
export class ReservationsOriginsModule {}
