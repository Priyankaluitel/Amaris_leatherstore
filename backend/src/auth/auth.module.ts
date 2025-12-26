import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

JwtModule.register({
  secret: 'supersecret',
  signOptions: { expiresIn: '1d' },
});

@Module({
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
