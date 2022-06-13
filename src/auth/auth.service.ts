import { Injectable } from '@nestjs/common';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async singUp(createUserDto: createUserDto): Promise<void> {
    return this.usersService.insertUser(createUserDto);
  }
}
