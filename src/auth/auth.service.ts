import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';
import { RegisterDto } from './dto/register';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(data: RegisterDto) {
    const hashedPassword= await AuthService.hashPassword(data.password);
    const user = await this.userService.create({
      email: data.email,
      hashedPassword,
    });
    return user;
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

  getAuthToken(userData) {
    const payload = { id: userData._id };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  login(userData, response) {
    const token = this.getAuthToken(userData);
    return response.json({
      token,
      userData,
    });
  }

  async verifyUser(login) {
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

  static comparePassword(user, password: string): Promise<boolean> {
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