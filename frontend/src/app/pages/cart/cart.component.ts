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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart?: Cart;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(res => {
      if (res) this.cart = res;
    });
    this.cartService.loadCart(); // Initial load
  }

  loadCart() {
    this.cartService.loadCart();
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId).subscribe(() => this.loadCart());
  }

  updateQuantity(itemId: number, qty: number) {
    this.cartService.updateQuantity(itemId, qty).subscribe(() => this.loadCart());
  }

  get cartTotal(): number {
    if (!this.cart || !this.cart.items) return 0;
    return this.cart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }
}
