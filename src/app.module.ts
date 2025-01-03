import { ReservationsOriginsModule } from './reservations-origins/reservations-origins.module';
import { ReservationsStatesModule } from './reservations-states/reservations-states.module';
import { PostgresConfigModule } from './database/postgres.config.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RentsExtrasModule } from './rents-extras/rents-extras.module';
import { RoomsStatesModule } from './rooms-states/rooms-states.module';
import { RoomsTypesModule } from './rooms-types/rooms-types.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { ExtrasModule } from './extras/extras.module';
import { RoomsModule } from './rooms/rooms.module';
import { RatesModule } from './rates/rates.module';
import { RentsModule } from './rents/rents.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RoomsModule,
    RentsModule,
    RatesModule,
    ExtrasModule,
    AmenitiesModule,
    RoomsTypesModule,
    RentsExtrasModule,
    RoomsStatesModule,
    ReservationsModule,
    PostgresConfigModule,
    ReservationsStatesModule,
    ReservationsOriginsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
