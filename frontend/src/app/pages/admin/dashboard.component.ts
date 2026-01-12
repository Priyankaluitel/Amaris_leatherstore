import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../services/products.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Make sure this file exists, even empty
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  newProduct: Partial<Product> = {}; // for form binding
  selectedFile?: File; // <-- add this property

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  addProduct() {
    if (!this.newProduct.name || !this.newProduct.price) return;
    this.productService.createProduct(this.newProduct).subscribe(() => {
      this.newProduct = {};
      this.loadProducts();
    });
  }

deleteProduct(productId?: number) {
  if (!productId) return; // safety check
  this.productService.deleteProduct(productId).subscribe(() => {
    this.loadProducts();
  });
}


  // ✅ THIS IS THE FIX
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }
}
