import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class FindUserByEmail {
  @IsEmail()
  @ApiProperty()
  email: string;
}
