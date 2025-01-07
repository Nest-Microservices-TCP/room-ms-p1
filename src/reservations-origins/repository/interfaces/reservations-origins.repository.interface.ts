import { IRepository } from 'src/common/repository';
import {
  CreateReservationOriginDto,
  UpdateReservationOriginDto,
} from 'src/reservations-origins/dto/request';
import { ReservationOrigin } from 'src/reservations-origins/entity/reservation-origin.entity';

export interface IReservationsOriginsRepository
  extends IRepository<
    ReservationOrigin,
    CreateReservationOriginDto,
    UpdateReservationOriginDto
  > {}
