import { Controller, Get, Post, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('cart')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CUSTOMER')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('add')
  addItem(@Req() req, @Body() body: { productId: number; quantity?: number }) {
    return this.cartService.addItem(req.user.userId, body.productId, body.quantity);
  }

  @Delete('remove/:id')
  removeItem(@Req() req, @Param('id') id: string) {
    return this.cartService.removeItem(req.user.userId, +id);
  }

  @Delete('clear')
  clearCart(@Req() req) {
    return this.cartService.clearCart(req.user.userId);
  }
}
