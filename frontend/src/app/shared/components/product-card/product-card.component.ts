import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../services/products.service';
import { AuthService } from '../../../../services/auth.service';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input() product!: Product;
  quantity: number = 1;

  constructor(
    private auth: AuthService,
    private cartService: CartService,
    private router: Router
  ) { }

  onAddToCart() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.product.id) {
      this.cartService.addToCart(this.product.id, this.quantity).subscribe({
        next: () => {
          alert(`${this.product.name} added to cart!`);
        },
        error: (err) => {
          console.error('Failed to add to cart', err);
          alert('Could not add item to cart. Please try again.');
        }
      });
    }
  }

  increaseQuantity() {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  get imageSrc(): string {
    if (!this.product || !this.product.imageUrl) {
      return 'assets/images/placeholder.jpg'; // Adjust if you have a specific placeholder
    }

    const path = this.product.imageUrl;

    // 1. If absolute URL, return as is
    if (path.startsWith('http')) {
      return path;
    }

    // 2. If it's a frontend asset, return as is (relative to root)
    if (path.startsWith('assets/')) {
      return path;
    }

    // 3. If it's a backend upload, prepend backend host with a slash
    // Ensure we don't end up with double slashes if path already starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `http://localhost:3000${cleanPath}`;
  }
}
