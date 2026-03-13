import { Controller, Get, Post, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Request } from 'express';

type AuthRequest = Request & { user: { userId: number } };

@Controller('cart')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CartController {
  constructor(private cartService: CartService) { }

  @Get()
  getCart(@Req() req: AuthRequest) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('add')
  addItem(
    @Req() req: AuthRequest,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.addItem(req.user.userId, productId, quantity || 1);
  }

  @Delete('remove/:itemId')
  removeItem(
    @Req() req: AuthRequest,
    @Param('itemId') itemId: string,
  ) {
    return this.cartService.removeItem(req.user.userId, +itemId);
  }

  @Delete('clear')
  clearCart(@Req() req: AuthRequest) {
    return this.cartService.clearCart(req.user.userId);
  }
}
