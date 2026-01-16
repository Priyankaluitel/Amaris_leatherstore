import { Controller, Post, Get, Patch, Body, Param, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('checkout')
  async checkout(@Req() req, @Body('address') address: string) {
    return this.orderService.checkout(req.user.userId, address);
  }

  @Get('my')
  async getMyOrders(@Req() req) {
    return this.orderService.getMyOrders(req.user.userId);
  }

  @Get()
  @Roles('ADMIN')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Patch(':id/status')
  @Roles('ADMIN')
  async updateStatus(@Param('id') id: string, @Body('status') status: 'PENDING' | 'SHIPPED' | 'DELIVERED') {
    return this.orderService.updateStatus(+id, status);
  }

  @Get(':id/invoice')
  @Roles('ADMIN', 'CUSTOMER')
  async getInvoice(@Param('id') id: string) {
    return this.orderService.getInvoice(+id);
  }
}
