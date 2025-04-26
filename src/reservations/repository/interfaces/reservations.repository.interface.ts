import { IBaseRepository } from 'src/common/repository';
import { SaveReservationType } from 'src/reservations/types';
import { Reservation } from 'src/reservations/entity/reservation.entity';

export interface IReservationsRepository
  extends IBaseRepository<Reservation, SaveReservationType> {}
