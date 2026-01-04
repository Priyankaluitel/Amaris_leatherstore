import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('products')
export class ProductsController {
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Req() req) {
    return { message: 'Hello, JWT user!', user: req.user };
  }
}


export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password too short' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.json({ message: 'If email exists, reset link sent' });

  const token = crypto.randomBytes(32).toString('hex');

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
  await user.save();

  console.log(`Reset Link: http://localhost:4200/reset-password/${token}`);

  res.json({ message: 'Reset link sent' });
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user)
    return res.status(400).json({ message: 'Invalid or expired token' });

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();

  res.json({ message: 'Password reset successful' });
};
