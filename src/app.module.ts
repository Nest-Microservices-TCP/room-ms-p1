import { Module } from '@nestjs/common';

import { PostgresConfigModule } from './database/postgres.config.module';

import { AmenitiesModule } from './amenities/amenities.module';
import { ExtrasModule } from './extras/extras.module';
import { RatesModule } from './rates/rates.module';
import { RentsExtrasModule } from './rents-extras/rents-extras.module';
import { RentsModule } from './rents/rents.module';
import { ReservationsOriginsModule } from './reservations-origins/reservations-origins.module';
import { ReservationsStatesModule } from './reservations-states/reservations-states.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RoomsStatesModule } from './rooms-states/rooms-states.module';
import { RoomsTypesModule } from './rooms-types/rooms-types.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    PostgresConfigModule,
    RoomsModule,
    RentsModule,
    RatesModule,
    ExtrasModule,
    AmenitiesModule,
    RoomsTypesModule,
    RentsExtrasModule,
    RoomsStatesModule,
    ReservationsModule,
    ReservationsStatesModule,
    ReservationsOriginsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
