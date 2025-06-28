import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user:RegisterDto) {
    const userData = await this.authService.register(user);
    return userData;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() user, @Res() response: Response) {
    const userData = await this.authService.verifyUser(user);
    return this.authService.login(userData, response);
  }


}
