import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeStorageProvider from '@shared/containers/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateUserService from './CreateUserService';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;

let fakeStorageProvider: FakeStorageProvider;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;

let createUserService: CreateUserService;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeStorageProvider = new FakeStorageProvider();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to upload avatar', async () => {
    const user = await createUserService.execute({
      name: 'Linus Torvalds',
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'torvalds_avatar.jpg',
    });

    expect(user.avatar).toBe('torvalds_avatar.jpg');
  });

  it('should not be able to update the avatar of an user that does not exist', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: '123abc',
        avatarFileName: 'user_avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete and update avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await createUserService.execute({
      name: 'Linus Torvalds',
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'torvalds_avatar.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'torvalds_avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('torvalds_avatar.jpg');
    expect(user.avatar).toBe('torvalds_avatar2.jpg');
  });
});
