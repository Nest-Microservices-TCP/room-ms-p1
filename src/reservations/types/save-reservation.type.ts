import { Reservation } from 'src/grpc/rooms/reservations.pb';

export type SaveReservationType = Omit<Reservation, 'reservation_id'>;
