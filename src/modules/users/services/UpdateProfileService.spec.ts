import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    const updatedUserProfile = await updateProfileService.execute({
      user_id: user.id,
      name: 'Linus 2',
      email: user.email,
    });

    expect(updatedUserProfile.name).toBe('Linus 2');
    expect(updatedUserProfile.email).toBe('torvalds@mail.com');
  });

  it('should not be able to update the profile of a non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user-id',
        name: 'non-existing-linus',
        email: 'nonexisting@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Elon',
      email: 'musk@mail.com',
      password: 'musk123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Elon',
        email: 'torvalds@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    await updateProfileService.execute({
      user_id: user.id,
      name: 'Linus',
      email: user.email,
      old_password: 'torvalds123',
      password: '123torvalds',
    });

    expect(user.password).toBe('123torvalds');
  });

  it('should not be able to update the user password without passing the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Linus',
        email: user.email,
        password: '123torvalds',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user password passing the wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Linus',
        email: user.email,
        old_password: 'incorrect-old-password',
        password: '123torvalds',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
