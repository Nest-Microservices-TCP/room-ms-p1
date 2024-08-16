import { Status } from '../enums/status.enum';
import {
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @Column({ name: 'updated_by', type: 'uuid' })
  updatedBy: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Column({ name: 'deleted_at', type: 'timestamp with time zone' })
  deletedAt: Date;
}
