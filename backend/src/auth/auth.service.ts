import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashed,
        role: Role.CUSTOMER,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException();

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException();

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env['JWT_SECRET'] || 'mysecret',
      { expiresIn: '1h' },
    );

    return { token };
  }
}

