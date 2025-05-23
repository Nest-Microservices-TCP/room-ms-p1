import { IBaseRepository } from 'src/common/repository';
import { CreateReservationOriginRequest } from 'src/grpc/rooms/reservations_origins.pb';
import { ReservationOrigin } from 'src/reservations-origins/entity/reservation-origin.entity';

export interface IReservationsOriginsRepository
  extends IBaseRepository<ReservationOrigin, CreateReservationOriginRequest> {}
