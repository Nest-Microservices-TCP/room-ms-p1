import { ReservationState } from './entity/reservation-state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationState])],
})
export class ReservationsStatesModule {}
