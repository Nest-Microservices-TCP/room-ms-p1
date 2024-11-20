import { ReservationsModule } from './reservations/reservations.module';
import { RoomsStatesModule } from './rooms-states/rooms-states.module';
import { PostgresDBModule } from './database/postgresdb.module';
import { RoomsModule } from './rooms/rooms.module';
import { RatesModule } from './rates/rates.module';
import { RentsModule } from './rents/rents.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RoomsModule,
    RentsModule,
    RatesModule,
    PostgresDBModule,
    RoomsStatesModule,
    ReservationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
