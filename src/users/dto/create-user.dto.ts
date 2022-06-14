import { IsString, MinLength } from 'class-validator';

export class createUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
