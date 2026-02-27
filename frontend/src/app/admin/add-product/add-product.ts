import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Category } from '../../../services/products.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
})
export class AddProductComponent {
  name = '';
  price = 0;
  description = '';
  stock = 0;
  category: Category = 'OTHER';
  imageUrl = '';

  constructor(private productService: ProductService) {}

  addProduct() {
    if (!this.name || !this.price) {
      alert('Name and price are required');
      return;
    }

    this.productService
      .createProduct({
        name: this.name,
        price: this.price,
        stock: this.stock,
        category: this.category,
        imageUrl: this.imageUrl || undefined,
      })
      .subscribe({
        next: () => {
          alert('Product added');
          this.name = '';
          this.price = 0;
          this.description = '';
          this.stock = 0;
          this.category = 'OTHER';
          this.imageUrl = '';
        },
        error: (err) => {
          console.error(err);
          alert('Failed to add product');
        },
      });
  }
}
