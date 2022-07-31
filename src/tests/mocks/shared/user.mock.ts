import { User, Roles } from '../../../users/user.schema';

export const mockUser: User = {
  _id: '123',
  username: 'Test',
  password: 'PasswordTest123',
  role: Roles.Employee,
};
