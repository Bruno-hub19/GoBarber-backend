import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;

let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const linusUser = await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    const elonUser = await fakeUsersRepository.create({
      name: 'Elon',
      email: 'musk@mail.com',
      password: 'musk123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Leonardo',
      email: 'dicaprio@mail.com',
      password: 'dicaprio123',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([linusUser, elonUser]);
  });
});
