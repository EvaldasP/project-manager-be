import { Roles } from '../../schemas/user.schema';
import { CreateUserDto } from '../../users/create-user.dto';

export const createUserDtoMock: CreateUserDto = {
  username: 'Test',
  password: 'test123',
  role: Roles.Employee,
};
