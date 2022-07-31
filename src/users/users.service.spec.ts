import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mockUser } from '../mocks/shared/user.mock';
import { User, Roles } from './user.schema';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert a new user and return true', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        username: 'Test',
        password: 'PasswordTest123',
        role: Roles.Employee,
      }),
    );

    const newUser = await service.insertUser(mockUser);

    expect(newUser).toEqual(true);
  });

  it('should return user', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue(mockUser as any);

    const foundUser = await service.getUser('Test');

    expect(foundUser).toEqual(mockUser);
  });
});
