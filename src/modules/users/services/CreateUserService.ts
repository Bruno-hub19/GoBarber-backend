import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) { } //eslint-disable-line

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const findEmail = await this.usersRepository.findByEmail(email);

    if (findEmail) {
      throw new AppError('This email is already in use');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
