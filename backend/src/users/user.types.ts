import { User, Role } from '@prisma/client';

// Optional: DTOs for creating or updating users
export interface CreateUserDto {
  email: string;
  password: string;
  role?: Role;
}

export interface LoginDto {
  email: string;
  password: string;
}