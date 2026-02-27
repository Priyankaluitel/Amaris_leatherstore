import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,        
    FormsModule      
  ],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  address = '';

  constructor(private orderService: OrderService) {}

  checkout() {
    if (!this.address) {
      alert("Please enter address");
      return;
    }

    this.orderService.checkout(this.address).subscribe({
      next: () => {
        alert('Payment Successful via Demo Gateway ✅');
      },
      error: () => alert('Checkout failed'),
    });
  }
}