import { uuid } from 'uuidv4';

interface AppointmentFormat {
  provider: string;
  date: Date;
}

class Appointment {
  constructor({ provider, date }: Omit<AppointmentFormat, 'id'>) {
    this.provider = provider;
    this.date = date;
    this.id = uuid();
  }

  id: string;

  provider: string;

  date: Date;
}

export default Appointment;
