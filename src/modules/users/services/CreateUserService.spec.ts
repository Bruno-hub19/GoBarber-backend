import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'Bruno',
      email: 'bruno@mail.com',
      password: 'bruno123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existing email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    await createUserService.execute({
      name: 'Bruno',
      email: 'bruno@mail.com',
      password: 'bruno123',
    });

    expect(
      createUserService.execute({
        name: 'Thiago',
        email: 'bruno@mail.com',
        password: 'thiago123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
