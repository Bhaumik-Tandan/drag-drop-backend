import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register';
import { LoginDto } from './dto/login.dto';

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
  async login(@Body() user:LoginDto) {
    const userData = await this.authService.verifyUser(user);
    return this.authService.login(userData);
  }


}
