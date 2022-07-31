import { IsEnum, IsString, MinLength } from 'class-validator';
import { Roles } from './user.schema';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(Roles)
  role: Roles;
}
