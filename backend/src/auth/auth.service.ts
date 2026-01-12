import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import fetch from 'node-fetch';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(email: string, password: string, role: Role = Role.CUSTOMER) {
    const hashed = await bcrypt.hash(password, 10);
    return this.prisma.user.create({ data: { email, password: hashed, role } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  generateJwt(user: User) {
    return { access_token: this.jwtService.sign({ sub: user.id, role: user.role }) };
  }

  async verifyCaptcha(captchaToken: string): Promise<boolean> {
    const secret = process.env.RECAPTCHA_SECRET_KEY!;
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${captchaToken}`,
    });
    const data = (await response.json()) as { success: boolean };
    return data.success;
  }
}
