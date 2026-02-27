// DO NOT create a class named User
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
// Example usage:
async function getUserInfo(userId: number, prisma: PrismaService): Promise<User> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');
  return user;
}