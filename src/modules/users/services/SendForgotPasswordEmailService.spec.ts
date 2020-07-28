import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/containers/providers/MailProvider/fakes/FakeMailProvider';
import FakeCacheProvider from '@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateUserService from './CreateUserService';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;

let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;
let fakeCacheProvider: FakeCacheProvider;

let createUserService: CreateUserService;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await createUserService.execute({
      name: 'Linus Torvalds',
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'torvalds@mail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'torvalds@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await createUserService.execute({
      name: 'Linus Torvalds',
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'torvalds@mail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
