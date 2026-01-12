import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  productId: number;
  quantity: number;
  product: any;
}

export interface Cart {
  id: number;
  items: CartItem[];
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl);
  }

  addToCart(productId: number, quantity = 1): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, { productId, quantity });
  }

  removeFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove/${cartItemId}`);
  }

  updateQuantity(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${cartItemId}`, { quantity });
  }
}
