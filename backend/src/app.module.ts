import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
@Module({
  controllers: [AppController],
   imports: [AuthModule, ProductsModule],
})
export class AppModule {}
