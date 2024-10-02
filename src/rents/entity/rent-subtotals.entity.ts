import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rent_subtotals' })
export class RentSubtotalsEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'rent_subtotals_id',
  })
  subtotals_id: string;

  @Column({
    name: 'room_total',
    type: 'numeric',
    precision: 9,
    scale: 2,
    default: 0,
    nullable: true,
  })
  roomTotal: number;

  @Column({
    name: 'room_total',
    type: 'numeric',
    precision: 9,
    scale: 2,
    default: 0,
    nullable: true,
  })
  overtimeTotal: number;

  @Column({
    name: 'room_total',
    type: 'numeric',
    precision: 9,
    scale: 2,
    default: 0,
    nullable: true,
  })
  earlyCheckinTotal: number;

  @Column({
    name: 'room_total',
    type: 'numeric',
    precision: 9,
    scale: 2,
    default: 0,
    nullable: true,
  })
  extraPeopleTotal: number;

  @Column({
    name: 'room_total',
    type: 'numeric',
    precision: 9,
    scale: 2,
    default: 0,
    nullable: true,
  })
  extraAccommodationsTotal: number;
}
