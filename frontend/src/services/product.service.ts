import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(category?: string): Observable<Product[]> {
    const url = category ? `${this.api}?category=${category}` : this.api;
    return this.http.get<Product[]>(url);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }
}
