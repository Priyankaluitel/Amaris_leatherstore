import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CheckoutService } from '../../../frontend/src/app/checkout/checkout.service';
import { CheckoutController } from '../../../backend/src/checkout.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [CartService, CheckoutService, PrismaService], // Services
  controllers: [CartController, CheckoutController],       // Controllers
})
export class CartModule {}
