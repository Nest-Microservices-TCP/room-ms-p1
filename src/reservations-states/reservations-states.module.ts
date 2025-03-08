import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationsStatesService } from './reservations-states.service';
import { ReservationsStatesController } from './reservations-states.controller';
import { ReservationsStatesRepository } from './repository/reservations-states.repository';

import { ReservationState } from './entity/reservation-state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationState])],
  providers: [ReservationsStatesRepository, ReservationsStatesService],
  controllers: [ReservationsStatesController],
})
export class ReservationsStatesModule {}
