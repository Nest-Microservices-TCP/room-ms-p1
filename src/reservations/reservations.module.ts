import { ReservationsRepository } from './repository/reservations.repository';
import { ReservationsController } from './reservations.controller';
import { ReservationEntity } from './entity/reservation.entity';
import { ReservationsService } from './reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity])],
  providers: [ReservationsRepository, ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
