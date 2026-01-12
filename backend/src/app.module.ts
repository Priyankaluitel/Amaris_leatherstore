import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';
@Module({
  controllers: [AppController],
   imports: [CartModule, AuthModule, ProductsModule],
     providers: [PrismaService],
})
export class AppModule {}
