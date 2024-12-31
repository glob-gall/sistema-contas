import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() dto: SignInUserDto) {
    return this.authService.signIn(dto);
  }
}
