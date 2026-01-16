import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  address = '';

  constructor(private orderService: OrderService) {}

  checkout() {
    this.orderService.checkout(this.address).subscribe({
      next: () => alert('Order placed successfully'),
      error: () => alert('Checkout failed'),
    });
  }
}
