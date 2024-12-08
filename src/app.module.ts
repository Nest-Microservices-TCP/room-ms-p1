import { PostgresConfigModule } from './database/postgres.config.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RentsExtrasModule } from './rents-extras/rents-extras.module';
import { RoomsStatesModule } from './rooms-states/rooms-states.module';
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
    RentsExtrasModule,
    RoomsStatesModule,
    ReservationsModule,
    PostgresConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
