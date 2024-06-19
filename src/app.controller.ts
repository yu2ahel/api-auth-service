import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * This method checks if the app is working.
   *
   * @returns {Promise<string>} The status of the app along with the current date and time.
   */
  @Get()
  async isWorking(): Promise<string> {
    return (
      'App is Working - ' +
      new Date().toDateString() +
      ' ' +
      new Date().toTimeString() +
      '.\nPlease check the API documentation at /api-docs'
    );
  }

  /**
   * Logs in a user.
   *
   * @param {Object} req - The request object.
   * @param {Object} req.user - The user object.
   * @returns {Promise} - A promise resolving to the result of the login operation.
   */
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async createUser(@Body() user: any) {
    const { username, password } = user;
    return await this.usersService.create({ username, password });
  }

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req: any, @Res() res: any) {
    console.log('user', req.user);
    // handles the Google OAuth2 callback
    const jwt: string = req.user?.accessToken;
    if (jwt) {
      this.authService.login({ username: req.user.email });
    }

    // res.redirect('http://localhost:3000/login/success/' + jwt);
    // else res.redirect('http://localhost:3000/login/failure');
  }
}
