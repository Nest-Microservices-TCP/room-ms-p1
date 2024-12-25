import { ReservationsStatesRepository } from './repository/reservations-states.repository';
import { ReservationsStatesController } from './reservations-states.controller';
import { ReservationsStatesService } from './reservations-states.service';
import { ReservationState } from './entity/reservation-state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationState])],
  providers: [ReservationsStatesRepository, ReservationsStatesService],
  controllers: [ReservationsStatesController],
})
export class ReservationsStatesModule {}
