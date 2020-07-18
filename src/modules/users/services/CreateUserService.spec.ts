import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHahsProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHahsProvider,
    );

    const user = await createUserService.execute({
      name: 'Bruno',
      email: 'bruno@mail.com',
      password: 'bruno123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existing email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHahsProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHahsProvider,
    );

    await createUserService.execute({
      name: 'Bruno',
      email: 'bruno@mail.com',
      password: 'bruno123',
    });

    expect(
      createUserService.execute({
        name: 'Bruno',
        email: 'bruno@mail.com',
        password: 'bruno123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
