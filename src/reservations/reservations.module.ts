import { ReservationsRepository } from './repository/reservations.repository';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entity/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationsRepository, ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
