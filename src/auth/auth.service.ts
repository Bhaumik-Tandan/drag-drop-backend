import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto): Promise<{ user: User }> {
    const hashedPassword = await AuthService.hashPassword(data.password);
    const user = await this.userService.create({
      email: data.email,
      hashedPassword,
    });

    if (!user) {
      throw new HttpException('User registration failed', 500);
    }

    const jwt = this.getAuthToken(user);
    return { user };
  }

  static hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return reject(err);
        }
        resolve(hash);
      });
    });
  }

  getAuthToken(userData: User): string {
    const payload = { id: userData.id };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  login(userData: User ) {
    const token = this.getAuthToken(userData);
    return {
      token,
      userData,
    };
  }

  async verifyUser(login: LoginDto): Promise<User> {
    const user = await this.userService.findByEmail(login.email);
    if (!user) {
      throw new HttpException('Invalid Credentials', 401);
    }
    const response = await AuthService.comparePassword(user, login.password);
    if (!response) {
      throw new HttpException('Invalid Credentials', 401);
    }

    return user;
  }

  static comparePassword(user: User, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          resolve(true);
          return;
        }
        reject(false);
      });
    });
  }
}