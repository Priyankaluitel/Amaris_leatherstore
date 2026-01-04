import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return false;

    try {
      req.user = jwt.verify(token, process.env['JWT_SECRET'] || 'mysecret');
      return true;
    } catch {
      return false;
    }
  }
}
