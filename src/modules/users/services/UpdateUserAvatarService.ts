import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';

import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfigs from '@configs/upload';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError(
        'Need to authenticate before changing your avatar',
        401,
      );
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(
        uploadConfigs.directory,
        user.avatar,
      );

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
