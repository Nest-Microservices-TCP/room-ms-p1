import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { PostgresDBModule } from './database/postgresdb.module';

@Module({
  imports: [PostgresDBModule, RoomsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
