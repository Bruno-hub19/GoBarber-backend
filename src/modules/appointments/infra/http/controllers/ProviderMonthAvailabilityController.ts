import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month } = request.query;

    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const monthAvailability = await listProviderMonthAvailabilityService.execute(
      {
        provider_id,
        year: Number(year),
        month: Number(month),
      },
    );

    return response.json(monthAvailability);
  }
}

export default ProviderMonthAvailabilityController;
