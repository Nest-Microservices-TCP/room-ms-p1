import { IRepository } from 'src/common/repository';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from 'src/reservations/dto/request';
import { Reservation } from 'src/reservations/entity/reservation.entity';

export interface IReservationsRepository
  extends IRepository<
    Reservation,
    CreateReservationDto,
    UpdateReservationDto
  > {}
