import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async insertUser(createUserDto: CreateUserDto): Promise<void> {
    let { username, password, role } = createUserDto;

    if (await this.getUser(username)) {
      throw new ConflictException('Username already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: User = new this.userModel({
      username,
      password: hashedPassword,
      role,
    });
    await newUser.save();
  }

  async getUser(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return user;
  }
}
