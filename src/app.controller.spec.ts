import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { Request } from 'express';
import { AuthService } from './auth/auth.service';

jest.mock('./auth.service');

describe('AppController', () => {
  let appController: AppController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AuthService],
    }).compile();

    appController = app.get<AppController>(AppController);
    authService = app.get<AuthService>(AuthService);
  });

  // Testing login method in AppController
  describe('login', () => {
    it('should return an object when the user logs in', async () => {
      const result = { access_token: 'testToken' };
      jest.spyOn(authService, 'login').mockImplementation(() => {
        return Promise.resolve(result); // Change here
      });

      expect(await appController.login({ user: {} } as Request)).toBe(result);
    });
  });
});
