import { Injectable, UnauthorizedException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import fetch from 'node-fetch';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  /* ================= REGISTER ================= */
  async register(email: string, password: string, role: Role = Role.CUSTOMER) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const hashed = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: { email, password: hashed, role },
    });
  }

  /* ================= LOGIN ================= */
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const accessToken = this.generateJwt(user);
    const refreshToken = crypto.randomBytes(40).toString('hex');
    const hashedRefresh = await bcrypt.hash(refreshToken, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRefresh },
    });

    // Use a conventional access_token field name for JWT
    return { access_token: accessToken, refreshToken, role: user.role };
  }

  /* ================= JWT GENERATION ================= */
  generateJwt(user: User) {
    return this.jwtService.sign(
      { sub: user.id, role: user.role },
      { expiresIn: '7d' },
    );
  }

  /* ================= REFRESH TOKEN ================= */
  async refresh(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.refreshToken) throw new ForbiddenException('Access denied');

    const valid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!valid) throw new ForbiddenException('Access denied');

    return { accessToken: this.generateJwt(user) };
  }

  /* ================= LOGOUT ================= */
  async logout(userId: number) {
    // Invalidate the stored refresh token for this user.
    // Access tokens remain valid until expiry, which is acceptable for stateless JWT.
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    return { message: 'Logged out successfully' };
  }

  /* ================= USER VALIDATION ================= */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  /* ================= CAPTCHA ================= */
  async verifyCaptcha(captchaToken: string): Promise<boolean> {
    const enabled =
      process.env.CAPTCHA_ENABLED !== 'false' && process.env.CAPTCHA_ENABLED !== '0';
    if (!enabled) return true;

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret || !captchaToken) return false;

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${captchaToken}`,
    });

    const data = (await response.json()) as { success: boolean };
    return data.success;
  }

  /* ================= FORGOT PASSWORD ================= */
  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return { message: 'If email exists, reset link sent' };

    const token = crypto.randomBytes(32).toString('hex');

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    return { message: 'Reset link generated', token }; // remove token in production
  }

  /* ================= RESET PASSWORD ================= */
  async resetPassword(token: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { resetToken: token, resetTokenExpiry: { gt: new Date() } },
    });

    if (!user) throw new UnauthorizedException('Invalid or expired token');

    const hashed = await bcrypt.hash(password, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashed, resetToken: null, resetTokenExpiry: null },
    });

    return { message: 'Password reset successful' };
  }
}