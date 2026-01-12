// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-cart',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent {
//   cartItems = [
//     { name: 'Leather Bag', price: 1200, quantity: 1 },
//     { name: 'Wallet', price: 450, quantity: 2 },
//     { name: 'Belt', price: 300, quantity: 1 }
//   ];

//   get totalAmount(): number {
//     return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, Cart } from '../../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart?: Cart;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((res) => (this.cart = res));
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId).subscribe(() => this.loadCart());
  }

  updateQuantity(itemId: number, qty: number) {
    this.cartService.updateQuantity(itemId, qty).subscribe(() => this.loadCart());
  }
}
