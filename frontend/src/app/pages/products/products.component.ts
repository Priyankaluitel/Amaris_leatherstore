import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product, Category } from '../../../services/products.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';
  categories: Category[] = ['ELECTRONICS','CLOTHING','SPORTS','BOOKS','OTHER'];
  selectedCategory?: string;

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts(this.selectedCategory).subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      },
    });
  }

  onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedCategory = select.value;
    this.loadProducts();
  }

  addToCart(product: Product) {
    if (!product.id) return;
    this.cartService.addToCart(product.id).subscribe({
      next: () => alert('Added to cart'),
      error: () => alert('Failed to add to cart'),
    });
  }
}
