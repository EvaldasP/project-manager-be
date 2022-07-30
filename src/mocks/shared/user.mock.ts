import { Roles, User } from '../../schemas/user.schema';

export const mockUser: User = {
  username: 'Test',
  password: 'PasswordTest123',
  role: Roles.Employee,
};
