import { uuid } from 'uuidv4';

class Appointment {
  constructor(provider: string, date: Date) {
    this.provider = provider;
    this.date = date;
    this.id = uuid();
  }

  id: string;

  provider: string;

  date: Date;
}

export default Appointment;
