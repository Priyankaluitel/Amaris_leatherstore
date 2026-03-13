import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) { }

  /* ================= Checkout ================= */
  async checkout(
    userId: number,
    address: string,
    paymentMethod: string,
    paymentStatus: string,
  ) {
    try {
      // Get user's cart with items and product details
      const cart = await this.prisma.cart.findFirst({
        where: { userId },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      if (!cart || cart.items.length === 0) {
        throw new NotFoundException('Cart is empty');
      }

      // Check stock availability
      for (const item of cart.items) {
        if (item.product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${item.product.name}`);
        }
      }

      // Calculate total
      const total = cart.items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0,
      );

      // Use a transaction to ensure atomic updates
      const order = await this.prisma.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
          data: {
            user: { connect: { id: userId } },
            address,
            total,
            paymentMethod,
            paymentStatus,
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

        // Decrease stock
        for (const item of cart.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: { decrement: item.quantity },
            },
          });
        }

        // Clear cart
        await tx.cartItem.deleteMany({
          where: { cartId: cart.id },
        });

        return newOrder;
      });

      // Send email notification asynchronously (fire and forget - do NOT await)
      this.prisma.user.findUnique({ where: { id: userId } }).then(user => {
        if (user) {
          this.emailService.sendOrderConfirmation('priyankaluitel17@gmail.com', order)
            .catch(err => console.error('Email notification failed:', err.message));
        }
      }).catch(err => console.error('Failed to fetch user for email:', err.message));

      return order;
    } catch (err: any) {
      console.error("CHECKOUT ERROR:", err?.message || err);
      throw err;
    }
  }

  /* ================= Get Orders of Current User ================= */
  async getMyOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  /* ================= Get All Orders (Admin) ================= */
  async getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        user: true,
        items: { include: { product: true } }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /* ================= Update Order Status ================= */
  async updateStatus(
    orderId: number,
    status: 'PENDING' | 'PACKING' | 'SHIPPED' | 'DELIVERED',
  ) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  /* ================= Get Single Order / Invoice ================= */
  async getInvoice(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}