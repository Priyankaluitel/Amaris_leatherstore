import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  price: number;
  category?: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = 'http://localhost:3000/products'; // backend endpoint

  constructor(private http: HttpClient) {}

  /** GET all products, optionally filter by category */
  getProducts(category?: string): Observable<Product[]> {
    let url = this.api;
    if (category) {
      url += `?category=${category}`;
    }
    return this.http.get<Product[]>(url);
  }

  /** GET single product by ID */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  /** CREATE new product (Admin only) */
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.api, product);
  }

  /** UPDATE product by ID (Admin only) */
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${id}`, product);
  }

  /** DELETE product by ID (Admin only) */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
