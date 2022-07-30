import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async insertUser(createUserDto: CreateUserDto): Promise<User> {
    let { username, password, role } = createUserDto;

    if (await this.getUser(username)) {
      throw new ConflictException('Username already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await this.userModel.create({
      username,
      password: hashedPassword,
      role,
    });

    return newUser;
  }

  async getUser(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return user;
  }
}
