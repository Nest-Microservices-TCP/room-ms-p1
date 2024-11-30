import { RentsExtrasRepository } from './repository/rents-extras.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RentsExtrasService {
  constructor(private readonly rentsExtrasRepository: RentsExtrasRepository) {}
}
