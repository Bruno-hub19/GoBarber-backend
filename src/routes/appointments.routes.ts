import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRoutes = Router();

appointmentRoutes.get('/', (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = appointmentsRepository.find();

  return response.json(appointments);
});

appointmentRoutes.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const appointmentService = new CreateAppointmentService();

    const appointment = await appointmentService.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentRoutes;
