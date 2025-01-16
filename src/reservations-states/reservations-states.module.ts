import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationState } from './entity/reservation-state.entity';

import { ReservationsStatesRepository } from './repository/reservations-states.repository';
import { ReservationsStatesController } from './reservations-states.controller';
import { ReservationsStatesService } from './reservations-states.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationState])],
  providers: [ReservationsStatesRepository, ReservationsStatesService],
  controllers: [ReservationsStatesController],
})
export class ReservationsStatesModule {}
