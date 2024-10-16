import { Injectable } from '@nestjs/common';
import { RentsRepository } from './repository/rents.repository';

@Injectable()
export class RentsService {
  constructor(private readonly rentsRepository: RentsRepository) {}
}
