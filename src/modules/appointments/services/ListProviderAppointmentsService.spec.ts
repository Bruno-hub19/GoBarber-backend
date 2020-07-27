import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';

import CreateAppointmentService from './CreateAppointmentService';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;

let createAppointmentService: CreateAppointmentService;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 6, 27, 7, 0, 0).getTime();
    });

    const appointment1 = await createAppointmentService.execute({
      provider_id: 'provider-123',
      user_id: '123',
      date: new Date(2020, 6, 27, 8, 0, 0),
    });

    const appointment2 = await createAppointmentService.execute({
      provider_id: 'provider-123',
      user_id: '456',
      date: new Date(2020, 6, 27, 9, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider-123',
      year: 2020,
      month: 7,
      day: 27,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
