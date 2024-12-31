import { IsEmail } from 'class-validator';

export class FindUserByEmail {
  @IsEmail()
  email: string;
}
