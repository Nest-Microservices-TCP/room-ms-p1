import { ReservationsOriginsRepository } from './repository/reservations-origins.repository';
import { ReservationsOriginsController } from './reservations-origins.controller';
import { ReservationsOriginsService } from './reservations-origins.service';
import { ReservationOrigin } from './entity/reservation-origin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationOrigin])],
  providers: [ReservationsOriginsRepository, ReservationsOriginsService],
  controllers: [ReservationsOriginsController],
})
export class ReservationsOriginsModule {}
