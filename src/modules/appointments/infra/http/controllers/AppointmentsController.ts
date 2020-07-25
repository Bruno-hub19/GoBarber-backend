import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { date, provider_id } = request.body;

    const parsedDate = parseISO(date);

    const appointmentService = container.resolve(CreateAppointmentService);

    const appointment = await appointmentService.execute({
      date: parsedDate,
      provider_id,
      user_id,
    });

    return response.json(appointment);
  }
}

export default AppointmentsController;
