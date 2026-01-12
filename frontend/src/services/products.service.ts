import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Category = 'ELECTRONICS' | 'CLOTHING' | 'SPORTS' | 'BOOKS' | 'OTHER';

export interface Product {
  id?: number;
  name: string;
  price: number;
  stock: number;
  category: Category;
  imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(category?: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl, { params: category ? { category } : {} });
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${productId}`);
  }
}

