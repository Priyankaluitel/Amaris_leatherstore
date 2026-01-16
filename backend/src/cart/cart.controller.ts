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
addItem(
  @Body('userId') userId: number,
  @Body('productId') productId: number,
  @Body('quantity') quantity: number,
) {
  return this.cartService.addItem(userId, productId, quantity);
}

@Delete('remove')
removeItem(
  @Body('userId') userId: number,
  @Body('productId') productId: number,
) {
  return this.cartService.removeItem(userId, productId);
}

  @Delete('clear')
  clearCart(@Req() req) {
    return this.cartService.clearCart(req.user.userId);
  }
}
