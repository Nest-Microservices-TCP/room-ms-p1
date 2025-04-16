import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reservation } from './entity/reservation.entity';

import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './repository/reservations.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationsRepository, ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
