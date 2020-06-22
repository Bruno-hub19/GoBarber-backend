import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public listAll(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const appointmentFound = this.appointments.find(appointment => {
      return isEqual(date, appointment.date);
    });

    return appointmentFound || null;
  }

  public create(provider: string, date: Date): Appointment {
    const newAppointment = new Appointment(provider, date);

    this.appointments.push(newAppointment);

    return newAppointment;
  }
}

export default AppointmentsRepository;
