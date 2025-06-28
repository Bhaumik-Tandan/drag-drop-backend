import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
   const { email, hashedPassword } = createUserDto;
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return user;
  }

  async findByEmail(email?: string) {
    if (!email) return null;
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

}
