import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 50)
  username: string;

  @IsString()
  @Length(8, 50)
  password: string;

  @IsString()
  @Length(8, 50)
  retypedPassword: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 50)
  firstName: string;

  @IsString()
  @Length(3, 50)
  lastName: string;
}

export class UserProfileDto extends PickType(CreateUserDto, [
  'username',
  'lastName',
  'firstName',
  'email',
] as const) {
  @IsString()
  token: string;
}
