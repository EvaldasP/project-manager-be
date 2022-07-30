import { Roles, User } from '../../services/users/user.schema';

export const mockUser: User = {
  username: 'Test',
  password: 'PasswordTest123',
  role: Roles.Employee,
};
