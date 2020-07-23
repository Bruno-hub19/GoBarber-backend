import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { } //eslint-disable-line

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const findUserWithSameEmail = await this.usersRepository.findByEmail(email);

    if (findUserWithSameEmail && findUserWithSameEmail.id !== user_id) {
      throw new AppError('This e-mail is already in use');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You need to enter the old password to update the password',
      );
    }

    if (password && old_password) {
      const compareUserOldPassword = await this.hashProvider.compare(
        old_password,
        user.password,
      );

      if (!compareUserOldPassword) {
        throw new AppError('Incorrect old password');
      }

      user.password = await this.hashProvider.generate(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
