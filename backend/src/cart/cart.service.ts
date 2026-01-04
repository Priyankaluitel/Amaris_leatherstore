import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  getCart(userId: number) {
    return this.prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });
  }

  addItem(userId: number, productId: number) {
    return this.prisma.cartItem.create({
      data: { productId, quantity: 1, cart: { connect: { userId } } },
    });
  }
}
