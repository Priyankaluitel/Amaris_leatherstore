import { Controller, Post, Body } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: { email: string; password: string; role?: string }) {
    const role: Role =
      body.role && Object.values(Role).includes(body.role as Role)
        ? (body.role as Role)
        : Role.CUSTOMER;

    return this.authService.register(body.email, body.password, role);
  }
  @Post('login')
async login(@Body() body: { email: string; password: string; captchaToken: string }) {
  // Verify captcha
  const secret = process.env.RECAPTCHA_SECRET_KEY!;
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${body.captchaToken}`,
  });
  const data = await response.json();
  if (!data.success) throw new UnauthorizedException('Captcha verification failed');

  // Then verify email/password
  const user = await this.authService.validateUser(body.email, body.password);
  if (!user) throw new UnauthorizedException('Invalid email or password');

  return this.authService.generateJwt(user); // return { access_token: '...' }
}
}