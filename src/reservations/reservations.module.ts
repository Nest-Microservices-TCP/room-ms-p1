import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reservation } from './entity/reservation.entity';

import { ReservationsRepository } from './repository/reservations.repository';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationsRepository, ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
