import { IsString, Length } from 'class-validator';
import { User } from '../users/user.schema';

export class CreateProjectDto {
  @IsString()
  @Length(1)
  readonly name: string;
  readonly projectManagerId: string;
  readonly workers: User[];
  readonly tasks: [];
}
