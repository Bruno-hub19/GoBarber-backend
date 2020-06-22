import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentRoutes = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentRoutes.get('/', (request, response) => {
  const allAppointments = appointmentsRepository.listAll();

  return response.json(allAppointments);
});

appointmentRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findDuplicatedAppointment = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findDuplicatedAppointment) {
    return response
      .status(400)
      .json({ error: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentRoutes;
