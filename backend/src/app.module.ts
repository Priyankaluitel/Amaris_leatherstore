import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { EmailModule } from './email/email.module';
import { OrderModule } from './order/order.module';

@Module({
  controllers: [AppController],
  imports: [
    PrismaModule,
    CartModule,
    AuthModule,
    ProductsModule,
    EmailModule,
    OrderModule
  ],
})
export class AppModule { }
