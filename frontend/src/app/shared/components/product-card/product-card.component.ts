import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProductCardData {
  name: string;
  price: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input() product!: ProductCardData;

  get imageSrc(): string {
    if (!this.product) {
      return 'https://via.placeholder.com/200';
    }

    if (this.product.imageUrl?.startsWith('http')) {
      return this.product.imageUrl;
    }

    if (this.product.imageUrl) {
      // Backend serves static files under /uploads at http://localhost:3000
      return `http://localhost:3000${this.product.imageUrl}`;
    }

    return 'https://via.placeholder.com/200';
  }
}
