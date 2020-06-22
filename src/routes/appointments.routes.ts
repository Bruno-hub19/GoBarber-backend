import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentRoutes = Router();

const appointments: Appointment[] = [];

appointmentRoutes.get('/', (request, response) => {
  return response.json({ appointments });
});

appointmentRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const duplicatedAppointmentHour = appointments.find(appointment => {
    return isEqual(parsedDate, appointment.date);
  });

  if (duplicatedAppointmentHour) {
    return response
      .status(400)
      .json({ error: 'This appointment is already booked' });
  }

  const newAppointment = new Appointment(provider, parsedDate);

  appointments.push(newAppointment);

  return response.json(newAppointment);
});

export default appointmentRoutes;
