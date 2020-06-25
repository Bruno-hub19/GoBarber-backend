import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const appointmentAlreadyBooked = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentAlreadyBooked) {
      throw Error('Appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      date: appointmentDate,
      provider,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
