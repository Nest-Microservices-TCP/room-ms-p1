import { HandleRpcExceptions } from 'src/common/decorators';
import { ConflictException, Injectable } from '@nestjs/common';

import { RentsRepository } from './repository/rents.repository';

import { CreateRentRequest } from 'src/grpc/rooms/rents.pb';

import { RatesService } from 'src/rates/rates.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { RentsExtrasService } from 'src/rents-extras/rents-extras.service';

import { addHoursToDate } from 'src/utils';

@Injectable()
export class RentsService {
  constructor(
    private readonly rentsRepository: RentsRepository,

    private readonly ratesService: RatesService,
    private readonly roomsService: RoomsService,
    private readonly rentsExtrasService: RentsExtrasService,
  ) {}

  @HandleRpcExceptions()
  async save(request: CreateRentRequest): Promise<void> {
    /**
     * TODO:
     *  1.- Obtener el usuario_id para el created_by desde el token
     */
    console.log(request);

    const { rate_id, room_id, accommodation_type, entry_type } = request;

    const rate = await this.ratesService.findOne({ rate_id });
    const room = await this.roomsService.findOne({ room_id });

    if (rate.accommodation_type !== accommodation_type) {
      throw new ConflictException(
        'Conflict: The accommodation type is different from the rate',
      );
    }

    // Verificar que las fechas de entrada y salida sean coherentes

    // La fecha_condensada seria la fecha_fin definida por la tarifa mas las horas_extra y hospedajes_extra comprados v

    // Verificar que la habitación esta disponible en las fechas_calculadas (que no este rentada)

    // En un futuro, quizá verificar un limite de horas_extra por tarifa
    // En un futuro, quizá validar un limite de personas_extra

    // Almacenar la renta
    const checkInDate = new Date();
    const checkoutDate = addHoursToDate(checkInDate, rate.duration);

    await this.rentsRepository.save({
      accommodation_type: request.accommodation_type,
      total_income: rate.accommodation_cost,
      entry_type,
      checkout_date: checkoutDate,
      room,
    });

    // Almacenar los subtotales de la renta

    // Almacenar los extras de la renta
    // this.rentsExtrasService.createMany({
    //   rents_extras: request.rent_extras,
    //   rate_id: request.rate_id,
    // });

    // Registrar los pagos de los conceptos (renta, extras)
  }
}
