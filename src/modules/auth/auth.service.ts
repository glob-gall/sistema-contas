import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { InvalidCredentialsError } from 'src/errors/invalid-credentials.error';
import { SignInUserDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInUserDto) {
    const user = await this.userService.getUserByEmail(email);

    const doesPasswordMatches = await compare(password, user.password);
    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    delete user.password;

    const payload = { sub: user.id, user: { id: user.id, email: user.email } };
    return {
      token: await this.jwtService.signAsync(payload),
      user,
    };
  }
}
