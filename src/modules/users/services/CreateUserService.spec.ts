import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Bruno',
      email: 'bruno@mail.com',
      password: 'bruno123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existing email', async () => {
    await createUserService.execute({
      name: 'Bruno',
      email: 'bruno@mail.com',
      password: 'bruno123',
    });

    await expect(
      createUserService.execute({
        name: 'Bruno',
        email: 'bruno@mail.com',
        password: 'bruno123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
