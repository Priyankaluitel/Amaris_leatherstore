import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // Get user's cart with items and product details
  async getCart(userId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: {
        items: { include: { product: true } },
      },
    });

    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  // Add item to cart
  async addItem(userId: number, productId: number, quantity = 1) {
    let cart = await this.prisma.cart.findFirst({ where: { userId } });

    if (!cart) {
      cart = await this.prisma.cart.create({ data: { userId } });
    }

    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { product: true },
      });
    }

    return this.prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
      include: { product: true },
    });
  }

  // Remove specific item
  async removeItem(userId: number, cartItemId: number) {
    const cart = await this.prisma.cart.findFirst({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.prisma.cartItem.findFirst({
      where: { id: cartItemId, cartId: cart.id },
    });

    if (!item) throw new NotFoundException('Cart item not found');

    return this.prisma.cartItem.delete({ where: { id: item.id } });
  }

  // Clear cart
  async clearCart(userId: number) {
    const cart = await this.prisma.cart.findFirst({ where: { userId } });
    if (!cart) return;

    return this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }
}
