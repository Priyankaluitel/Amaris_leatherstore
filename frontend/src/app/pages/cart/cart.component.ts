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
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  loading = true;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cartItems = data.items || data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  remove(item: any) {
    this.cartService.removeFromCart(item.productId).subscribe({
      next: () => this.loadCart(),
    });
  }

  get totalAmount(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}

