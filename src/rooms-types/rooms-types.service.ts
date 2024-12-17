import { RoomsTypesRepository } from './repository/rooms-types.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsTypesService {
  constructor(private readonly roomsTypesRepository: RoomsTypesRepository) {}
}
