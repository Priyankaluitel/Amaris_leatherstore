import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('cart')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CUSTOMER')
export class CartController {
  constructor(private cart: CartService) {}

  @Get()
  get(@Req() req) {
    return this.cart.getCart(req.user.userId);
  }

  @Post('add')
  add(@Req() req, @Body() body) {
    return this.cart.addItem(req.user.userId, body.productId);
  }
}
