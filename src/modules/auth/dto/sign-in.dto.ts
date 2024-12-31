import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
