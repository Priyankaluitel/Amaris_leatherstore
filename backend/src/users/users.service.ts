import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Find a user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Find a user by reset token
  async findByResetToken(token: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { resetToken: token },
    });
  }

async create(data: { email: string; password: string; role?: Role }) {
  return this.prisma.user.create({
   data: {
      email: data.email,
      password: data.password,
      role: data.role || Role.CUSTOMER, // use enum
    },
  });
}



  // Update a user
  async update(id: number, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Optional: Get all users
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
