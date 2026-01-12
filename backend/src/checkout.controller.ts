import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { CheckoutService } from '../../frontend/src/app/checkout/checkout.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('checkout')
@UseGuards(JwtAuthGuard)
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  @Post()
  checkout(@Req() req: any) {
    return this.checkoutService.checkout(req.user.id);
  }
}
