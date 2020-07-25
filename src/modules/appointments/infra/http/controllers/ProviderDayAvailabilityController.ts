import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month, day } = request.body;

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const dayAvailability = await listProviderDayAvailabilityService.execute({
      provider_id,
      year,
      month,
      day,
    });

    return response.json(dayAvailability);
  }
}

export default ProviderDayAvailabilityController;
