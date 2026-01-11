// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   standalone: true,
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css'],
//   imports: [CommonModule]
// })
// export class ProductsComponent {
//   products = [
//     { name: 'Leather Bag', price: 1200, image: 'assets/products/bag.jpg' },
//     { name: 'Wallet', price: 450, image: 'assets/products/wallet.jpg' },
//     { name: 'Belt', price: 300, image: 'assets/products/belt.jpg' },
//     { name: 'Leather Jacket', price: 2500, image: 'assets/products/jacket.jpg' }
//   ];
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
  this.productService.getProducts().subscribe({
    next: (data) => {
      this.products = data; // <-- use API response
      this.loading = false;
    },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      },
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id).subscribe({
      next: () => alert('Added to cart 🛒'),
      error: () => alert('Failed to add to cart'),
    });
  }
}

