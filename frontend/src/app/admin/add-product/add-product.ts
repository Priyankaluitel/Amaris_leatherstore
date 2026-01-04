import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  addProduct() {
    this.http.post('http://localhost:3000/products', {
      name: this.name,
      price: this.price,
      description: this.description,
    }).subscribe(() => {
      alert('Product added');
    });
  }
}
