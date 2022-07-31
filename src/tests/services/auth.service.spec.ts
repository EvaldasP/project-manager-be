import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '../../users/users.service';
import { AuthService } from '../../auth/auth.service';
import { createUserDtoMock } from '../mocks/dto/create-user.dto.mock';
import { UsersServiceMock } from '../mocks/services/users.service.mock';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersServiceMock;

  jest.mock('bcrypt', () => ({
    compare: () => true,
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        { provide: UsersService, useClass: UsersServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should call usersService insertUser method', () => {
      service.signUp(createUserDtoMock);

      expect(usersService.insertUser).toBeCalledWith(createUserDtoMock);
    });
  });

  describe('signIn', () => {
    it('should throw Error if user not found', () => {
      usersService.getUser.mockResolvedValue(null);

      expect(
        service.signIn({ username: 'test', password: '12312dfgdfg34' }),
      ).rejects.toThrowError();
    });
  });
});
