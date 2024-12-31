import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtService],
  exports: [UserService],
})
export class UserModule {}
