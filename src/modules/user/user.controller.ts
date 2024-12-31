import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserByEmail } from './dto/find-user-by-email.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Body() dto: FindUserByEmail) {
    return this.userService.getUserByEmail(dto.email);
  }

  @Post('/register')
  register(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @UseGuards(AuthGuard)
  @Put()
  update(@Body() dto: UpdateUserDto, @Request() req) {
    // return { token: req.token };
    return this.userService.updateUser(req.token.user.id, dto);
  }
}
