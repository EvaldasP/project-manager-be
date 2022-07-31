import { Roles, User } from '../../users/user.schema';

export const mockUser: User = {
  username: 'Test',
  password: 'PasswordTest123',
  role: Roles.Employee,
};
