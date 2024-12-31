import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }
  async update(data: Prisma.UserUpdateArgs): Promise<User> {
    return this.prisma.user.update(data);
  }
  async findOne(data: Prisma.UserFindUniqueArgs): Promise<User> {
    return this.prisma.user.findUnique(data);
  }
  async delete(data: Prisma.UserDeleteArgs): Promise<User> {
    return this.prisma.user.delete(data);
  }
}
