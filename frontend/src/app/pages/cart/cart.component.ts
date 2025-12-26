import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems = [
    { name: 'Leather Bag', price: 1200, quantity: 1 },
    { name: 'Wallet', price: 450, quantity: 2 },
    { name: 'Belt', price: 300, quantity: 1 }
  ];

  get totalAmount(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
