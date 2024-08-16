import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { PostgresDBModule } from './database/postgresdb.module';
import { RoomsStatesModule } from './rooms-states/rooms-state.module';

@Module({
  imports: [PostgresDBModule, RoomsModule, RoomsStatesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
