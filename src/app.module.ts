import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { PostgresDBModule } from './database/postgresdb.module';
import { RoomsStatesModule } from './rooms-states/rooms-state.module';
import { RatesModule } from './rates/rates.module';
import { RentsModule } from './rents/rents.module';

@Module({
  imports: [
    RoomsModule,
    RentsModule,
    RatesModule,
    PostgresDBModule,
    RoomsStatesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
