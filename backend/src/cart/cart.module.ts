import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CheckoutService } from '../checkout/checkout.service';
import { CheckoutController } from '../checkout/checkout.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [CartService, CheckoutService, PrismaService], // Services
  controllers: [CartController, CheckoutController],       // Controllers
})
export class CartModule {}
