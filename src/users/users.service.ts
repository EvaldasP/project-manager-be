import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async insertUser(createUserDto: createUserDto): Promise<void> {
    let { username, password } = createUserDto;

    username = username.toLowerCase();

    const newUser = new this.userModel({
      username,
      password,
    });
    await newUser.save();
  }
}
