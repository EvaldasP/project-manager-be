import { Test, TestingModule } from '@nestjs/testing';
import { authCredentialsDtoMock } from '../mocks/dto/auth-credentials.dto.mock';
import { createUserDtoMock } from '../mocks/dto/create-user.dto.mock';
import { AuthServiceMock } from '../mocks/services/auth.service.mock';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useClass: AuthServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/signup', () => {
    it('should call authService signUp method', () => {
      controller.signUp(createUserDtoMock);

      expect(authService.signUp).toHaveBeenCalledWith(createUserDtoMock);
    });
  });

  describe('/signIn', () => {
    it('should call authService signIn method', () => {
      controller.signIn(authCredentialsDtoMock);

      expect(authService.signIn).toHaveBeenCalledWith(authCredentialsDtoMock);
    });
  });
});
