import { CreateUserDto } from '../../users/dto/create-user.dto';
import { Roles } from '../../users/user.schema';

export const createUserDtoMock: CreateUserDto = {
  username: 'Test',
  password: 'test123',
  role: Roles.Employee,
};
