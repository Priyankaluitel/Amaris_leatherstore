import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../../services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.slice(0, 4); // Show top 4
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  getCategoryImage(category: string): string {
    const images: { [key: string]: string } = {
      'WALLETS': 'assets/images/leatherbag4.jpg',
      'BELTS': 'assets/images/leatherbag2.jpg',
      'ACCESSORIES': 'assets/images/leatherbag3.jpg',
      'BAGS': 'assets/images/leatherbag1.jpg'
    };
    return images[category] || 'assets/images/leatherbag1.jpg';
  }
}
