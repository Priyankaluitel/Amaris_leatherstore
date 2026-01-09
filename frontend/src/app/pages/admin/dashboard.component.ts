import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  products: any[] = [];

  newProduct = {
    name: '',
    price: 0,
    category: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http
      .get<any[]>('http://localhost:3000/products')
      .subscribe((res) => (this.products = res));
  }

  addProduct() {
    this.http
      .post('http://localhost:3000/products', this.newProduct)
      .subscribe(() => {
        this.newProduct = { name: '', price: 0, category: '' };
        this.loadProducts();
      });
  }

  deleteProduct(id: number) {
    this.http
      .delete(`http://localhost:3000/products/${id}`)
      .subscribe(() => this.loadProducts());
  }
}
