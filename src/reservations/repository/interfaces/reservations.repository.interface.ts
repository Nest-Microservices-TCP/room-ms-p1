import { Reservation } from 'src/reservations/entity/reservation.entity';
import { IBaseRepository } from 'src/common/interfaces';
import {
  UpdateReservationDto,
  CreateReservationDto,
} from 'src/reservations/dto/request';

export interface IReservationsRepository
  extends IBaseRepository<
    Reservation,
    CreateReservationDto,
    UpdateReservationDto
  > {}
