import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from 'src/errors/user-already-exists.error';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createUser({ email, name, password }: CreateUserDto): Promise<User> {
    const userWithSameEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 4);

    return await this.userRepository.create({
      email,
      name,
      password: password_hash,
    });
  }

  async updateUser(id: string, { name }: UpdateUserDto): Promise<User> {
    return await this.userRepository.update({
      data: { name, updatedAt: new Date() },
      where: {
        id,
      },
    });
  }
}
