import { ReservationOrigin } from 'src/reservations-origins/entity/reservation-origin.entity';
import { IBaseRepository } from 'src/common/interfaces';
import {
  CreateReservationOriginDto,
  UpdateReservationOriginDto,
} from 'src/reservations-origins/dto/request';

export interface IReservationsOriginsRepository
  extends IBaseRepository<
    ReservationOrigin,
    CreateReservationOriginDto,
    UpdateReservationOriginDto
  > {}
