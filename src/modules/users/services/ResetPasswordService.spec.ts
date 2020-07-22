import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Linus Torvalds',
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateToken = jest.spyOn(fakeHashProvider, 'generate');

    await resetPasswordService.execute({
      token,
      password: 'torvalds4321',
    });

    expect(generateToken).toHaveBeenCalledWith('torvalds4321');
    expect(user.password).toBe('torvalds4321');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: 'non-existing-user-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPasswordService.execute({
        token,
        password: 'non-existing-user-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password id passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Linus Torvalds',
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token,
        password: 'torvalds4321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
