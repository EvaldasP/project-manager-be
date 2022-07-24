import { IsEnum, IsString, MinLength } from 'class-validator';
import { Roles } from '../users.model';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(Roles)
  role: Roles;
}
