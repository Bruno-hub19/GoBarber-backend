import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Linus Torvalds',
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    const response = await authenticateUserService.execute({
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate an user that does not exist', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'torvalds@mail.com',
        password: 'torvalds123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Linus Torvalds',
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    await expect(
      authenticateUserService.execute({
        email: 'torvalds@mail.com',
        password: 'torvalds1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
