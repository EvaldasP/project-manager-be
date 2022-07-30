import { CreateUserDto } from '../../services/users/dto/create-user.dto';
import { Roles } from '../../services/users/user.schema';

export const createUserDtoMock: CreateUserDto = {
  username: 'Test',
  password: 'test123',
  role: Roles.Employee,
};
