import { PostgresConfigModule } from './database/postgres.config.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RentsExtrasModule } from './rents-extras/rents-extras.module';
import { RoomsStatesModule } from './rooms-states/rooms-states.module';
import { RoomsModule } from './rooms/rooms.module';
import { RatesModule } from './rates/rates.module';
import { RentsModule } from './rents/rents.module';
import { Module } from '@nestjs/common';
import { AmenitiesModule } from './amenities/amenities.module';

@Module({
  imports: [
    RoomsModule,
    RentsModule,
    RatesModule,
    AmenitiesModule,
    RentsExtrasModule,
    RoomsStatesModule,
    ReservationsModule,
    PostgresConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
