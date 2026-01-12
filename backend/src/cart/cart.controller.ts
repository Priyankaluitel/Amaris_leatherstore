import { Controller, Get, Post, Delete, Body, Req, Param, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Request } from 'express';
@Controller('cart')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CUSTOMER')
export class CartController {
  constructor(private cartService: CartService) {}

@Get()
async getCart(@Req() req: Request & { user: { userId: number } }) {
  return this.cartService.getCart(req.user.userId);
}
//  @Get()
//   async getCart(@Req() req) {
//     return this.cartService.getCart(req.user.userId);
//   }

  @Post('add')
  async addItem(@Req() req, @Body() body: { productId: number; quantity?: number }) {
    return this.cartService.addItem(req.user.userId, body.productId, body.quantity);
  }

  @Delete('remove/:id')
  async removeItem(@Req() req, @Param('id') id: string) {
    return this.cartService.removeItem(req.user.userId, parseInt(id));
  }

  @Delete('clear')
  async clearCart(@Req() req) {
    return this.cartService.clearCart(req.user.userId);
  }
}
