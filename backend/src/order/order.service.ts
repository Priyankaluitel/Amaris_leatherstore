import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async checkout(userId: number, address: string) {
    const cart = await this.prisma.cart.findFirst({
  where: { userId },
  include: {
    items: {
      include: {
        product: true, // only if relation exists
      },
    },
  },
});

    if (!cart || cart.items.length === 0)
      throw new NotFoundException('Cart is empty');

    const total = cart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

    const order = await this.prisma.order.create({
      data: {
        userId,
        address,
        total,
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    // Clear cart
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return order;
  }

  async getMyOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllOrders() {
    return this.prisma.order.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(orderId: number, status: 'PENDING' | 'SHIPPED' | 'DELIVERED') {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  async getInvoice(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
