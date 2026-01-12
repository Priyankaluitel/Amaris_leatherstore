import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  id: number;
  product: { id: number; name: string; price: number; };
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.API}/cart`);
  }

  checkout(address: string): Observable<any> {
    return this.http.post(`${this.API}/checkout`, { address });
  }
}

