import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async insertUser(createUserDto: createUserDto): Promise<void> {
    let { username, password } = createUserDto;

    if (await this.getUser(username)) {
      throw new ConflictException('Username already exists');
    }

    const newUser = new this.userModel({
      username,
      password,
    });
    await newUser.save();
  }

  private async getUser(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return user;
  }
}
