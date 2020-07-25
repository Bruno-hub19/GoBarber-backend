import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: 'any-provider-id',
      user_id: 'any-user-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('any-provider-id');
    expect(appointment.user_id).toBe('any-user-id');
  });

  it('should not be able to create two appointments in the same hour', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: 'any-provider-id',
      user_id: 'any-user-id',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: 'any-provider-id',
        user_id: 'any-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
