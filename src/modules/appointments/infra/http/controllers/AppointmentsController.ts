import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { date, provider_id } = request.body;

    const appointmentService = container.resolve(CreateAppointmentService);

    const appointment = await appointmentService.execute({
      date,
      provider_id,
      user_id,
    });

    return response.json(appointment);
  }
}

export default AppointmentsController;
